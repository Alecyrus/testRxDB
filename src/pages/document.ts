import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from 'rxdb';
export const documentSchemaLiteral = {
  title: 'document schema',
  version: 0,
  keyCompression: true,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    tags: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    createdAt: {
      type: 'number',
    },
    updatedAt: {
      type: 'number',
    },
    deletedAt: {
      type: 'number',
    },
    // 协作者
    collaborators: {
      type: 'object',
      properties: {
        sync: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string',
          },
        },
        async: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string',
          },
        },
      },
    },
    collaborationType: {
      // 'sync' | 'async': 同步/异步协作
      type: 'string',
    },
    forkFrom: {
      // 用于异步协作，标识该协作文档来自于某个user的某个workspace的某个doc
      type: 'string',
    },
    ownedBy: {
      // 用于同步协作，标识该协作文档来自于某个user的某个workspace的某个doc
      type: 'string',
    },
    // 文档状态
    starMarked: {
      type: 'boolean',
    },
    deletedMarked: {
      type: 'boolean',
    },
    // 文档设置
    shareSettings: {
      type: 'object',
      properties: {
        fontType: {
          type: 'string',
        },
        updatedAt: {
          type: 'number',
        },
      },
    },
    hideTitle: {
      type: 'boolean',
    },
    colorTitle: {
      type: 'boolean',
    },
    titleColor: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
        },
        background: {
          type: 'string',
        },
      },
    },
    enableCoverImage: {
      type: 'boolean',
    },
    coverImage: {
      type: 'object',
      properties: {
        src: {
          type: 'string',
        },
        blurHash: {
          type: 'string',
        },
      },
    },
    mergeTitleAndCover: {
      type: 'boolean',
    },
    // 计算属性
    summaryText: {
      type: 'string',
    },
    phrasesList: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    previewSvg: {
      type: 'string',
    },
    readingTime: {
      type: 'number',
    },
    wordCount: {
      type: 'number',
    },
    characterCount: {
      type: 'number',
    },
    blockCount: {
      type: 'number',
    },
  },
  required: ['id', 'createdAt'],
  indexes: ['id', 'title'],
} as const; // <- It is important to set 'as const' to preserve the literal type
const schemaTyped = toTypedRxJsonSchema(documentSchemaLiteral);

// aggregate the document type from the schema
export type DocumentDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

// create the typed RxJsonSchema from the literal typed object.
const documentSchema: RxJsonSchema<DocumentDocType> = documentSchemaLiteral;
