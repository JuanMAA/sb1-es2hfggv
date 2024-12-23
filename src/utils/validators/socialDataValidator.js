export function validateSocialData(data) {
  if (!data) return null;
  
  const { url, image } = data;
  if (!url && !image) return null;
  
  return {
    url: url || null,
    image: image || null
  };
}