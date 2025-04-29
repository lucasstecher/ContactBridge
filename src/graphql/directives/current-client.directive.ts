/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import * as jwt from 'jsonwebtoken';

export function currentClientDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directives = getDirective(schema, fieldConfig, 'currentClient');
      if (directives?.length) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const authHeader =
            context.req.headers['authorization'] ||
            context.req.headers['Authorization'];
          if (!authHeader) {
            throw new Error('Authorization header missing');
          }
          const token = authHeader.replace('Bearer ', '');

          try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
              client: string;
            };
            context.client = payload.client;
          } catch (err) {
            throw new Error(err + 'Invalid or expired token');
          }

          return await resolve.call(this, source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
}
