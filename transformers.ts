import { OpenAPIV3 } from "openapi-types";
import { FernOpenAPIExtension } from "../extensions/fernExtensions";
import { getExtension } from "../extensions/getExtension";

abstract class TransformationExtensions {
    getSdkMethodName(operation: OpenAPIV3.OperationObject) {
        return getExtension<string>(operation, FernOpenAPIExtension.SDK_METHOD_NAME);
    }
    getSdkTypeName(schema: OpenAPIV3.SchemaObject) {
        return getExtension<string>(schema, FernOpenAPIExtension.TYPE_NAME);
    }

    getSdkGroupNameForOperation(conf: OpenAPIV3.OperationObject) {
        return getExtension<string>(conf, FernOpenAPIExtension.SDK_GROUP_NAME);
    }
    getSdkGroupNameForSchema(conf: OpenAPIV3.SchemaObject) {
        return getExtension<string>(conf, FernOpenAPIExtension.SDK_GROUP_NAME);
    }

    // Do we really even need this overloading here?
    // Probably not
    getSdkGroupName(conf: OpenAPIV3.OperationObject): string;
    getSdkGroupName(conf: OpenAPIV3.SchemaObject): string;
    getSdkGroupName(conf: any): string  {
        if (conf instanceof OpenAPIV3.OperationObject) {
            return this.getSdkGroupNameForOperation(conf)
        } else {
            return this.getSdkGroupNameForSchema(conf)
        }
    }

    getRequestName(operation: OpenAPIV3.OperationObject): string {
        return getExtension<string>(operation, [
            FernOpenAPIExtension.REQUEST_NAME_V1,
            FernOpenAPIExtension.REQUEST_NAME_V2
        ]);
    }
}

// class CustomTransformationExtention extends TransformationExtensions {
//     override getSdkGroupNameForOperation(operation: OpenAPIV3.OperationObject): string {
//         return "bad_example"
//     }
// }