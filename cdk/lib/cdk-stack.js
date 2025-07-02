"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvelteKitSite = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const constructs_1 = require("constructs");
const path_1 = __importDefault(require("path"));
const __dirname = process.cwd();
class SvelteKitSite extends constructs_1.Construct {
    svelteLambda;
    cloudfrontDistribution;
    constructor(scope, id, props) {
        super(scope, id);
        const svelte = new cdk.aws_lambda.Function(this, `${id}-svelte-lambda`, {
            runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
            architecture: cdk.aws_lambda.Architecture.ARM_64,
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(10),
            handler: 'serverless.handler',
            code: cdk.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, './build/server')),
            ...props?.lambdaProps
        });
        const svelteURL = svelte.addFunctionUrl({ authType: aws_lambda_1.FunctionUrlAuthType.NONE });
        const edgeFunction = new cdk.aws_cloudfront.experimental.EdgeFunction(this, `${id}-svelte-lambda-edge`, {
            runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
            handler: 'router.handler',
            memorySize: 128,
            code: cdk.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, './build/edge'))
        });
        const staticAssets = new cdk.aws_s3.Bucket(this, `${id}-static-asset-bucket`, {
            blockPublicAccess: aws_s3_1.BlockPublicAccess.BLOCK_ACLS,
            accessControl: aws_s3_1.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL
        });
        staticAssets.addToResourcePolicy(new aws_iam_1.PolicyStatement({
            actions: ['s3:GetObject'],
            effect: aws_iam_1.Effect.ALLOW,
            resources: [staticAssets.arnForObjects('*')],
            sid: 'PublicReadGetObject',
            principals: [new cdk.aws_iam.AnyPrincipal()]
        }));
        const forwardHeaderFunction = new cdk.aws_cloudfront.Function(this, `${id}-forward-header-function`, {
            code: cdk.aws_cloudfront.FunctionCode.fromInline(`function handler(event) {
                event.request.headers['x-forwarded-host'] = event.request.headers['host']
                return event.request
          }`)
        });
        new cdk.aws_s3_deployment.BucketDeployment(this, `${id}-deploy-prerender`, {
            sources: [cdk.aws_s3_deployment.Source.asset(path_1.default.join(__dirname, './build/prerendered'))],
            destinationBucket: staticAssets,
            prune: false,
            cacheControl: [cdk.aws_s3_deployment.CacheControl.maxAge(aws_cdk_lib_1.Duration.minutes(5))]
        });
        new cdk.aws_s3_deployment.BucketDeployment(this, `${id}-deploy-assets`, {
            sources: [cdk.aws_s3_deployment.Source.asset(path_1.default.join(__dirname, './build/assets/'))],
            destinationBucket: staticAssets,
            prune: false,
            cacheControl: [
                cdk.aws_s3_deployment.CacheControl.maxAge(aws_cdk_lib_1.Duration.days(365)),
                cdk.aws_s3_deployment.CacheControl.immutable()
            ]
        });
        new cdk.aws_s3_deployment.BucketDeployment(this, `${id}-deploy-static`, {
            sources: [cdk.aws_s3_deployment.Source.asset(path_1.default.join(__dirname, './build/assets/_app'))],
            destinationBucket: staticAssets,
            destinationKeyPrefix: '_app',
            prune: false,
            cacheControl: [
                cdk.aws_s3_deployment.CacheControl.maxAge(aws_cdk_lib_1.Duration.days(365)),
                cdk.aws_s3_deployment.CacheControl.immutable()
            ]
        });
        const distribution = new cdk.aws_cloudfront.Distribution(this, `${id}-svelte-cloudfront`, {
            ...props?.cloudfrontProps,
            defaultBehavior: {
                allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_ALL,
                origin: new cdk.aws_cloudfront_origins.HttpOrigin(cdk.Fn.select(2, cdk.Fn.split('/', svelteURL.url)), {
                    customHeaders: {
                        's3-host': staticAssets.virtualHostedUrlForObject().replace('https://', '')
                    }
                }),
                viewerProtocolPolicy: aws_cloudfront_1.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                compress: true,
                originRequestPolicy: new cdk.aws_cloudfront.OriginRequestPolicy(this, `${id}-svelte-orp`, {
                    cookieBehavior: aws_cloudfront_1.OriginRequestCookieBehavior.all(),
                    queryStringBehavior: aws_cloudfront_1.OriginRequestQueryStringBehavior.all(),
                    headerBehavior: aws_cloudfront_1.OriginRequestHeaderBehavior.allowList('x-forwarded-host')
                }),
                cachePolicy: new cdk.aws_cloudfront.CachePolicy(this, `${id}-svelte-cp`, {
                    cookieBehavior: aws_cloudfront_1.CacheCookieBehavior.all(),
                    queryStringBehavior: aws_cloudfront_1.CacheQueryStringBehavior.all(),
                    headerBehavior: aws_cloudfront_1.CacheHeaderBehavior.allowList('x-forwarded-host'),
                    enableAcceptEncodingBrotli: true,
                    enableAcceptEncodingGzip: true
                }),
                ...props?.cloudfrontProps?.defaultBehavior,
                edgeLambdas: [
                    {
                        functionVersion: edgeFunction.currentVersion,
                        eventType: cdk.aws_cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST
                    },
                    ...(props?.cloudfrontProps?.defaultBehavior?.edgeLambdas || [])
                ],
                functionAssociations: [
                    {
                        function: forwardHeaderFunction,
                        eventType: cdk.aws_cloudfront.FunctionEventType.VIEWER_REQUEST
                    },
                    ...(props?.cloudfrontProps?.defaultBehavior?.functionAssociations || [])
                ]
            }
        });
        this.svelteLambda = svelte;
        this.cloudfrontDistribution = distribution;
    }
}
exports.SvelteKitSite = SvelteKitSite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLDZDQUF1QztBQUN2QywrREFRb0M7QUFDcEMsaURBQThEO0FBQzlELHVEQUE2RDtBQUM3RCwrQ0FBNEU7QUFDNUUsMkNBQXVDO0FBQ3ZDLGdEQUF3QjtBQUV4QixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFjaEMsTUFBYSxhQUFjLFNBQVEsc0JBQVM7SUFDcEMsWUFBWSxDQUEwQjtJQUN0QyxzQkFBc0IsQ0FBa0M7SUFDL0QsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUEwQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtZQUN2RSxPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMzQyxZQUFZLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTTtZQUNoRCxVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsc0JBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNFLEdBQUcsS0FBSyxFQUFFLFdBQVc7U0FDckIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFB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WUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsWUFBWSxDQUFDO0lBQzVDLENBQUM7Q0FDRDtBQWxJRCxzQ0FrSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgRHVyYXRpb24gfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQge1xuXHRDYWNoZUNvb2tpZUJlaGF2aW9yLFxuXHRDYWNoZUhlYWRlckJlaGF2aW9yLFxuXHRDYWNoZVF1ZXJ5U3RyaW5nQmVoYXZpb3IsXG5cdE9yaWdpblJlcXVlc3RDb29raWVCZWhhdmlvcixcblx0T3JpZ2luUmVxdWVzdEhlYWRlckJlaGF2aW9yLFxuXHRPcmlnaW5SZXF1ZXN0UXVlcnlTdHJpbmdCZWhhdmlvcixcblx0Vmlld2VyUHJvdG9jb2xQb2xpY3lcbn0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnQnO1xuaW1wb3J0IHsgRWZmZWN0LCBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCB7IEZ1bmN0aW9uVXJsQXV0aFR5cGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCB7IEJsb2NrUHVibGljQWNjZXNzLCBCdWNrZXRBY2Nlc3NDb250cm9sIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IF9fZGlybmFtZSA9IHByb2Nlc3MuY3dkKCk7XG5cbnR5cGUgUGFydGlhbEJ5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IE9taXQ8VCwgSz4gJiBQYXJ0aWFsPFBpY2s8VCwgSz4+O1xuXG5leHBvcnQgdHlwZSBTdmVsdGVraXRTaXRlUHJvcHMgPSB7XG5cdGxhbWJkYVByb3BzPzogUGFydGlhbEJ5PFxuXHRcdE9taXQ8Y2RrLmF3c19sYW1iZGEuRnVuY3Rpb25Qcm9wcywgJ2NvZGUnIHwgJ3J1bnRpbWUnIHwgJ2hhbmRsZXInPixcblx0XHQnYXJjaGl0ZWN0dXJlJyB8ICd0aW1lb3V0JyB8ICdtZW1vcnlTaXplJ1xuXHQ+O1xuXHRjbG91ZGZyb250UHJvcHM/OiBPbWl0PGNkay5hd3NfY2xvdWRmcm9udC5EaXN0cmlidXRpb25Qcm9wcywgJ2RlZmF1bHRCZWhhdmlvcic+ICYge1xuXHRcdGRlZmF1bHRCZWhhdmlvcjogT21pdDxjZGsuYXdzX2Nsb3VkZnJvbnQuQmVoYXZpb3JPcHRpb25zLCAnb3JpZ2luJz47XG5cdH07XG59O1xuXG5leHBvcnQgY2xhc3MgU3ZlbHRlS2l0U2l0ZSBleHRlbmRzIENvbnN0cnVjdCB7XG5cdHB1YmxpYyBzdmVsdGVMYW1iZGE6IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uO1xuXHRwdWJsaWMgY2xvdWRmcm9udERpc3RyaWJ1dGlvbjogY2RrLmF3c19jbG91ZGZyb250LkRpc3RyaWJ1dGlvbjtcblx0Y29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdmVsdGVraXRTaXRlUHJvcHMpIHtcblx0XHRzdXBlcihzY29wZSwgaWQpO1xuXG5cdFx0Y29uc3Qgc3ZlbHRlID0gbmV3IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIGAke2lkfS1zdmVsdGUtbGFtYmRhYCwge1xuXHRcdFx0cnVudGltZTogY2RrLmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcblx0XHRcdGFyY2hpdGVjdHVyZTogY2RrLmF3c19sYW1iZGEuQXJjaGl0ZWN0dXJlLkFSTV82NCxcblx0XHRcdG1lbW9yeVNpemU6IDEwMjQsXG5cdFx0XHR0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDEwKSxcblx0XHRcdGhhbmRsZXI6ICdzZXJ2ZXJsZXNzLmhhbmRsZXInLFxuXHRcdFx0Y29kZTogY2RrLmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vYnVpbGQvc2VydmVyJykpLFxuXHRcdFx0Li4ucHJvcHM/LmxhbWJkYVByb3BzXG5cdFx0fSk7XG5cblx0XHRjb25zdCBzdmVsdGVVUkwgPSBzdmVsdGUuYWRkRnVuY3Rpb25VcmwoeyBhdXRoVHlwZTogRnVuY3Rpb25VcmxBdXRoVHlwZS5OT05FIH0pO1xuXG5cdFx0Y29uc3QgZWRnZUZ1bmN0aW9uID0gbmV3IGNkay5hd3NfY2xvdWRmcm9udC5leHBlcmltZW50YWwuRWRnZUZ1bmN0aW9uKFxuXHRcdFx0dGhpcyxcblx0XHRcdGAke2lkfS1zdmVsdGUtbGFtYmRhLWVkZ2VgLFxuXHRcdFx0e1xuXHRcdFx0XHRydW50aW1lOiBjZGsuYXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YLFxuXHRcdFx0XHRoYW5kbGVyOiAncm91dGVyLmhhbmRsZXInLFxuXHRcdFx0XHRtZW1vcnlTaXplOiAxMjgsXG5cdFx0XHRcdGNvZGU6IGNkay5hd3NfbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuL2J1aWxkL2VkZ2UnKSlcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0Y29uc3Qgc3RhdGljQXNzZXRzID0gbmV3IGNkay5hd3NfczMuQnVja2V0KHRoaXMsIGAke2lkfS1zdGF0aWMtYXNzZXQtYnVja2V0YCwge1xuXHRcdFx0YmxvY2tQdWJsaWNBY2Nlc3M6IEJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FDTFMsXG5cdFx0XHRhY2Nlc3NDb250cm9sOiBCdWNrZXRBY2Nlc3NDb250cm9sLkJVQ0tFVF9PV05FUl9GVUxMX0NPTlRST0xcblx0XHR9KTtcblxuXHRcdHN0YXRpY0Fzc2V0cy5hZGRUb1Jlc291cmNlUG9saWN5KFxuXHRcdFx0bmV3IFBvbGljeVN0YXRlbWVudCh7XG5cdFx0XHRcdGFjdGlvbnM6IFsnczM6R2V0T2JqZWN0J10sXG5cdFx0XHRcdGVmZmVjdDogRWZmZWN0LkFMTE9XLFxuXHRcdFx0XHRyZXNvdXJjZXM6IFtzdGF0aWNBc3NldHMuYXJuRm9yT2JqZWN0cygnKicpXSxcblx0XHRcdFx0c2lkOiAnUHVibGljUmVhZEdldE9iamVjdCcsXG5cdFx0XHRcdHByaW5jaXBhbHM6IFtuZXcgY2RrLmF3c19pYW0uQW55UHJpbmNpcGFsKCldXG5cdFx0XHR9KVxuXHRcdCk7XG5cblx0XHRjb25zdCBmb3J3YXJkSGVhZGVyRnVuY3Rpb24gPSBuZXcgY2RrLmF3c19jbG91ZGZyb250LkZ1bmN0aW9uKFxuXHRcdFx0dGhpcyxcblx0XHRcdGAke2lkfS1mb3J3YXJkLWhlYWRlci1mdW5jdGlvbmAsXG5cdFx0XHR7XG5cdFx0XHRcdGNvZGU6IGNkay5hd3NfY2xvdWRmcm9udC5GdW5jdGlvbkNvZGUuZnJvbUlubGluZShgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnJlcXVlc3QuaGVhZGVyc1sneC1mb3J3YXJkZWQtaG9zdCddID0gZXZlbnQucmVxdWVzdC5oZWFkZXJzWydob3N0J11cbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucmVxdWVzdFxuICAgICAgICAgIH1gKVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHRuZXcgY2RrLmF3c19zM19kZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgYCR7aWR9LWRlcGxveS1wcmVyZW5kZXJgLCB7XG5cdFx0XHRzb3VyY2VzOiBbY2RrLmF3c19zM19kZXBsb3ltZW50LlNvdXJjZS5hc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9idWlsZC9wcmVyZW5kZXJlZCcpKV0sXG5cdFx0XHRkZXN0aW5hdGlvbkJ1Y2tldDogc3RhdGljQXNzZXRzLFxuXHRcdFx0cHJ1bmU6IGZhbHNlLFxuXHRcdFx0Y2FjaGVDb250cm9sOiBbY2RrLmF3c19zM19kZXBsb3ltZW50LkNhY2hlQ29udHJvbC5tYXhBZ2UoRHVyYXRpb24ubWludXRlcyg1KSldXG5cdFx0fSk7XG5cblx0XHRuZXcgY2RrLmF3c19zM19kZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgYCR7aWR9LWRlcGxveS1hc3NldHNgLCB7XG5cdFx0XHRzb3VyY2VzOiBbY2RrLmF3c19zM19kZXBsb3ltZW50LlNvdXJjZS5hc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9idWlsZC9hc3NldHMvJykpXSxcblx0XHRcdGRlc3RpbmF0aW9uQnVja2V0OiBzdGF0aWNBc3NldHMsXG5cdFx0XHRwcnVuZTogZmFsc2UsXG5cdFx0XHRjYWNoZUNvbnRyb2w6IFtcblx0XHRcdFx0Y2RrLmF3c19zM19kZXBsb3ltZW50LkNhY2hlQ29udHJvbC5tYXhBZ2UoRHVyYXRpb24uZGF5cygzNjUpKSxcblx0XHRcdFx0Y2RrLmF3c19zM19kZXBsb3ltZW50LkNhY2hlQ29udHJvbC5pbW11dGFibGUoKVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0bmV3IGNkay5hd3NfczNfZGVwbG95bWVudC5CdWNrZXREZXBsb3ltZW50KHRoaXMsIGAke2lkfS1kZXBsb3ktc3RhdGljYCwge1xuXHRcdFx0c291cmNlczogW2Nkay5hd3NfczNfZGVwbG95bWVudC5Tb3VyY2UuYXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vYnVpbGQvYXNzZXRzL19hcHAnKSldLFxuXHRcdFx0ZGVzdGluYXRpb25CdWNrZXQ6IHN0YXRpY0Fzc2V0cyxcblx0XHRcdGRlc3RpbmF0aW9uS2V5UHJlZml4OiAnX2FwcCcsXG5cdFx0XHRwcnVuZTogZmFsc2UsXG5cdFx0XHRjYWNoZUNvbnRyb2w6IFtcblx0XHRcdFx0Y2RrLmF3c19zM19kZXBsb3ltZW50LkNhY2hlQ29udHJvbC5tYXhBZ2UoRHVyYXRpb24uZGF5cygzNjUpKSxcblx0XHRcdFx0Y2RrLmF3c19zM19kZXBsb3ltZW50LkNhY2hlQ29udHJvbC5pbW11dGFibGUoKVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNkay5hd3NfY2xvdWRmcm9udC5EaXN0cmlidXRpb24odGhpcywgYCR7aWR9LXN2ZWx0ZS1jbG91ZGZyb250YCwge1xuXHRcdFx0Li4ucHJvcHM/LmNsb3VkZnJvbnRQcm9wcyxcblx0XHRcdGRlZmF1bHRCZWhhdmlvcjoge1xuXHRcdFx0XHRhbGxvd2VkTWV0aG9kczogY2RrLmF3c19jbG91ZGZyb250LkFsbG93ZWRNZXRob2RzLkFMTE9XX0FMTCxcblx0XHRcdFx0b3JpZ2luOiBuZXcgY2RrLmF3c19jbG91ZGZyb250X29yaWdpbnMuSHR0cE9yaWdpbihcblx0XHRcdFx0XHRjZGsuRm4uc2VsZWN0KDIsIGNkay5Gbi5zcGxpdCgnLycsIHN2ZWx0ZVVSTC51cmwpKSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjdXN0b21IZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdCdzMy1ob3N0Jzogc3RhdGljQXNzZXRzLnZpcnR1YWxIb3N0ZWRVcmxGb3JPYmplY3QoKS5yZXBsYWNlKCdodHRwczovLycsICcnKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KSxcblx0XHRcdFx0dmlld2VyUHJvdG9jb2xQb2xpY3k6IFZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxuXHRcdFx0XHRjb21wcmVzczogdHJ1ZSxcblx0XHRcdFx0b3JpZ2luUmVxdWVzdFBvbGljeTogbmV3IGNkay5hd3NfY2xvdWRmcm9udC5PcmlnaW5SZXF1ZXN0UG9saWN5KHRoaXMsIGAke2lkfS1zdmVsdGUtb3JwYCwge1xuXHRcdFx0XHRcdGNvb2tpZUJlaGF2aW9yOiBPcmlnaW5SZXF1ZXN0Q29va2llQmVoYXZpb3IuYWxsKCksXG5cdFx0XHRcdFx0cXVlcnlTdHJpbmdCZWhhdmlvcjogT3JpZ2luUmVxdWVzdFF1ZXJ5U3RyaW5nQmVoYXZpb3IuYWxsKCksXG5cdFx0XHRcdFx0aGVhZGVyQmVoYXZpb3I6IE9yaWdpblJlcXVlc3RIZWFkZXJCZWhhdmlvci5hbGxvd0xpc3QoJ3gtZm9yd2FyZGVkLWhvc3QnKVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0Y2FjaGVQb2xpY3k6IG5ldyBjZGsuYXdzX2Nsb3VkZnJvbnQuQ2FjaGVQb2xpY3kodGhpcywgYCR7aWR9LXN2ZWx0ZS1jcGAsIHtcblx0XHRcdFx0XHRjb29raWVCZWhhdmlvcjogQ2FjaGVDb29raWVCZWhhdmlvci5hbGwoKSxcblx0XHRcdFx0XHRxdWVyeVN0cmluZ0JlaGF2aW9yOiBDYWNoZVF1ZXJ5U3RyaW5nQmVoYXZpb3IuYWxsKCksXG5cdFx0XHRcdFx0aGVhZGVyQmVoYXZpb3I6IENhY2hlSGVhZGVyQmVoYXZpb3IuYWxsb3dMaXN0KCd4LWZvcndhcmRlZC1ob3N0JyksXG5cdFx0XHRcdFx0ZW5hYmxlQWNjZXB0RW5jb2RpbmdCcm90bGk6IHRydWUsXG5cdFx0XHRcdFx0ZW5hYmxlQWNjZXB0RW5jb2RpbmdHemlwOiB0cnVlXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHQuLi5wcm9wcz8uY2xvdWRmcm9udFByb3BzPy5kZWZhdWx0QmVoYXZpb3IsXG5cdFx0XHRcdGVkZ2VMYW1iZGFzOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZnVuY3Rpb25WZXJzaW9uOiBlZGdlRnVuY3Rpb24uY3VycmVudFZlcnNpb24sXG5cdFx0XHRcdFx0XHRldmVudFR5cGU6IGNkay5hd3NfY2xvdWRmcm9udC5MYW1iZGFFZGdlRXZlbnRUeXBlLk9SSUdJTl9SRVFVRVNUXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQuLi4ocHJvcHM/LmNsb3VkZnJvbnRQcm9wcz8uZGVmYXVsdEJlaGF2aW9yPy5lZGdlTGFtYmRhcyB8fCBbXSlcblx0XHRcdFx0XSxcblx0XHRcdFx0ZnVuY3Rpb25Bc3NvY2lhdGlvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmdW5jdGlvbjogZm9yd2FyZEhlYWRlckZ1bmN0aW9uLFxuXHRcdFx0XHRcdFx0ZXZlbnRUeXBlOiBjZGsuYXdzX2Nsb3VkZnJvbnQuRnVuY3Rpb25FdmVudFR5cGUuVklFV0VSX1JFUVVFU1Rcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC4uLihwcm9wcz8uY2xvdWRmcm9udFByb3BzPy5kZWZhdWx0QmVoYXZpb3I/LmZ1bmN0aW9uQXNzb2NpYXRpb25zIHx8IFtdKVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnN2ZWx0ZUxhbWJkYSA9IHN2ZWx0ZTtcblx0XHR0aGlzLmNsb3VkZnJvbnREaXN0cmlidXRpb24gPSBkaXN0cmlidXRpb247XG5cdH1cbn1cbiJdfQ==