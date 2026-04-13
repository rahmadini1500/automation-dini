export const merchantListData = {
  merchantName: process.env.MERCHANT_NAME ?? 'FS Regenera',
  merchantCode: process.env.MERCHANT_CODE ?? 'MRCHN-001',
  merchantType: process.env.MERCHANT_TYPE ?? 'Provider',
  merchantCategory: process.env.MERCHANT_CATEGORY ?? 'Beauty',
  entries: Number(process.env.MERCHANT_ENTRIES ?? '5'),
  emptySearchKeyword: process.env.EMPTY_SEARCH_KEYWORD ?? 'zzzz-not-found',
  missingCategoryKeyword: process.env.MISSING_CATEGORY_KEYWORD ?? 'zzzz-category-not-found',
} as const;
