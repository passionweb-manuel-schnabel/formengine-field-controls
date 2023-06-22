define(["TYPO3/CMS/Core/Ajax/AjaxRequest", "TYPO3/CMS/Backend/Notification"], function(AjaxRequest, Notification) {

    addEventListener();
    function addEventListener() {
        document.getElementById('appendDescription').addEventListener("click", function(ev) {
            ev.preventDefault();

            let pageId = parseInt(this.getAttribute('data-page-id'));
            let fieldName = this.getAttribute('data-field-name');
            sendAjaxRequest(pageId, fieldName);
        });
    }

    /**
     *
     * @param {int} pageId
     * @param {string} fieldName
     */
    function sendAjaxRequest(pageId, fieldName) {
        Notification.info('Start appending description', 'Process started...', 5);
        new AjaxRequest(TYPO3.settings.ajaxUrls['append_description'])
            .post(
                { pageId: pageId }
            )
            .then(async function (response) {
                const resolved = await response.resolve();
                const responseBody = JSON.parse(resolved);
                if(responseBody.error) {
                    Notification.error('An unexpected request error occured.', responseBody.error);
                } else {
                    document.querySelector('textarea[name="data[pages]['+pageId+']['+fieldName+']"]').value += responseBody.result;
                    Notification.info('Finished appending description', 'Process finished...', 5);
                }
            })
            .catch((error) => {
                Notification.error('An unexpected error occured.', error);
            });
    }
});
