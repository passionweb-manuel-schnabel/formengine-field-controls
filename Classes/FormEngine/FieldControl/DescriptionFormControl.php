<?php

declare(strict_types=1);

namespace Passionweb\FormengineFieldControls\FormEngine\FieldControl;

use TYPO3\CMS\Backend\Form\AbstractNode;
use TYPO3\CMS\Core\Information\Typo3Version;
use TYPO3\CMS\Core\Page\JavaScriptModuleInstruction;

class DescriptionFormControl extends AbstractNode
{
    public function render(): array
    {
        $resultArray = [
            'iconIdentifier' => 'actions-document-synchronize',
            'title' => 'Custom field control title',
            'linkAttributes' => [
                'id' => 'appendDescription',
                'data-page-id' => $this->data['databaseRow']['uid'],
                'data-field-name' => 'description'
            ]
        ];

        $typo3Version = new Typo3Version();
        if ($typo3Version->getMajorVersion() === 12) {
            $resultArray['javaScriptModules'] = [
                JavaScriptModuleInstruction::create('@passionweb/formengine-field-controls/append-description.js'),
            ];
        } elseif ($typo3Version->getMajorVersion() === 11) {
            $resultArray['requireJsModules'] = [
                JavaScriptModuleInstruction::forRequireJS('TYPO3/CMS/FormengineFieldControls/AppendDescription')
            ];
        } else {
            $resultArray['requireJsModules'] = [
                'TYPO3/CMS/FormengineFieldControls/AppendDescription'
            ];
        }
        return $resultArray;
    }
}
