export const defaultDocumentNodeResolver = (S: any) => {
  return S.document().views([S.view.form()]);
};
