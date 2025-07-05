import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class MyPersonnelWebsite extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// S3 Bucket for static assets
		const siteBucket = new s3.Bucket(this, 'MyPersonnelSite', {
			bucketName: 'my-personnel-website-aws',
			websiteIndexDocument: 'index.html',
			publicReadAccess: false,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			autoDeleteObjects: true
		});
		const contactFormBucket = s3.Bucket.fromBucketArn(
			this,
			'contactFormBucket',
			'arn:aws:s3:::rk-personnel-website-contact-form'
		);

		// Lambda for SSR page
		const contactFormFunction = new NodejsFunction(this, 'ContactFormLambda', {
			runtime: lambda.Runtime.NODEJS_20_X,
			handler: 'handler',
			entry: path.join(process.cwd(), './lambda-function/index.ts') // SSR lambda folder
		});
		const contactFormFunctionUrl = contactFormFunction.addFunctionUrl({
			authType: lambda.FunctionUrlAuthType.NONE,
			cors: {
				// Allow this to be called from websites on https://example.com.
				// Can also be ['*'] to allow all domain.
				allowedOrigins: [
					'https://www.rajitkhosla.com',
					'http://localhost:5173',
					'http://localhost:4173'
				]

				// More options are possible here, see the documentation for FunctionUrlCorsOptions
			}
		});
		contactFormBucket.grantReadWrite(contactFormFunction);
		// Output the Lambda function URL
		new cdk.CfnOutput(this, 'LambdaUrl', {
			value: contactFormFunctionUrl.url,
			description: 'URL for Contact Form Lambda function'
		});
		// CloudFront distribution
		const distribution = new cloudfront.Distribution(this, 'SvelteDistribution', {
			defaultBehavior: {
				origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
				viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
			},
			defaultRootObject: 'index.html'
		});

		// // Deploy static site to S3
		new s3deploy.BucketDeployment(this, 'DeployStaticSite', {
			sources: [s3deploy.Source.asset(path.join(process.cwd(), './build'))], // path to SvelteKit build output
			destinationBucket: siteBucket,
			//contentType: 'text/html',
			distribution,
			distributionPaths: ['/*']
		});
	}
}
