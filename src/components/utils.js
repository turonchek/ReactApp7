export function getBase64(file, onSuccess = () => {}, onError = () => {}) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        onSuccess(reader.result);
    };
    reader.onerror = function (error) {
        onError(error);
    };
}