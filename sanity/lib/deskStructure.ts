export const defaultDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form()]);
};
