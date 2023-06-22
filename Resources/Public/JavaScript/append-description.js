import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
import Notification from "@typo3/backend/notification.js";

class AppendDescription {
    constructor() {
        //this.addEventListener = this.addEventListener.bind(this);
        this.addEventListener();
    }

    addEventListener() {
        let executeRequest = this.sendAjaxRequest;
        document.getElementById('appendDescription').addEventListener("click", function(ev) {
            ev.preventDefault();

            let pageId = parseInt(this.getAttribute('data-page-id'));
            let fieldName = this.getAttribute('data-field-name');
            executeRequest(pageId, fieldName);
        });
    }

    /**
     *
     * @param {int} pageId
     * @param {string} fieldName
     */
    sendAjaxRequest(pageId, fieldName) {
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
}

export default new AppendDescription();
