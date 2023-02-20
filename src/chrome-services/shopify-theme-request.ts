function getThemeList(
  message: Record<string, string>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: Record<string, string>) => void
) {
  const headers = {
    "X-Shopify-Access-Token": message.storeToken,
    "Content-Type": "application/json",
  };

  fetch(`https://${message.storeName}.myshopify.com/admin/api/2022-04/themes.json`, { headers })
    .then(response => response.json())
    .then(json => sendResponse(json))
    .catch(error => sendResponse(error));

  return true;
}

chrome.runtime.onMessage.addListener(getThemeList);

