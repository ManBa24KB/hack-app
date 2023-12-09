export const updateLocalStorageSearchInfo = ( addressType: string = '', currentSearchKey: string = '', searchAddressKey: string = '') => {
    localStorage.setItem('addressType', addressType)
    localStorage.setItem('currentSearchKey', currentSearchKey)
    localStorage.setItem('searchAddressKey', searchAddressKey)
}