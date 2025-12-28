import { z } from 'zod';
import { insertPropertySchema, insertInvestmentSchema, insertVisitSchema, properties, investments, visits } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  properties: {
    list: {
      method: 'GET' as const,
      path: '/api/properties',
      responses: {
        200: z.array(z.custom<typeof properties.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/properties/:id',
      responses: {
        200: z.custom<typeof properties.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/properties',
      input: insertPropertySchema,
      responses: {
        201: z.custom<typeof properties.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
  investments: {
    list: {
      method: 'GET' as const,
      path: '/api/investments',
      responses: {
        200: z.array(z.custom<typeof investments.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/investments',
      input: insertInvestmentSchema,
      responses: {
        201: z.custom<typeof investments.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
  visits: {
    log: {
      method: 'POST' as const,
      path: '/api/visits',
      input: insertVisitSchema,
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
    stats: {
      method: 'GET' as const,
      path: '/api/stats/visits',
      responses: {
        200: z.object({ total: z.number() }),
        401: errorSchemas.unauthorized,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
