<?php

$GLOBALS['TCA']['pages']['columns']['description']['config'] = array_merge_recursive(
    $GLOBALS['TCA']['pages']['columns']['description']['config'],
    [
        'fieldControl' => [
            'importControl' => [
                'renderType' => 'descriptionFormControl'
            ]
        ]
    ]
);
