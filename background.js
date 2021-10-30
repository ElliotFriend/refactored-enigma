let color = '#3aa757';
let navOptions = {
  year: true,
  month: true
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ navOptions });
  console.log(`Default navigation options set to ${JSON.stringify(navOptions)}`)
});
