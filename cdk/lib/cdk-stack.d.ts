import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type SveltekitSiteProps = {
    lambdaProps?: PartialBy<Omit<cdk.aws_lambda.FunctionProps, 'code' | 'runtime' | 'handler'>, 'architecture' | 'timeout' | 'memorySize'>;
    cloudfrontProps?: Omit<cdk.aws_cloudfront.DistributionProps, 'defaultBehavior'> & {
        defaultBehavior: Omit<cdk.aws_cloudfront.BehaviorOptions, 'origin'>;
    };
};
export declare class SvelteKitSite extends Construct {
    svelteLambda: cdk.aws_lambda.Function;
    cloudfrontDistribution: cdk.aws_cloudfront.Distribution;
    constructor(scope: Construct, id: string, props?: SveltekitSiteProps);
}
export {};
