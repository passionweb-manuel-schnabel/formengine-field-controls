<?php

declare(strict_types=1);

namespace Passionweb\FormengineFieldControls\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\Response;

class AjaxController
{
    public function __construct()
    {

    }

    public function descriptionFormControlAction(ServerRequestInterface $request): ResponseInterface
    {
        $pageId = (int)($request->getParsedBody()['pageId'] ?? 0);

        $response = new Response();
        $result = "I am a test output and will be appended to the content of the description field of the page with id " . $pageId;

        // add your logic/functionality here and replace or extend the result parameter

        $response->getBody()->write(json_encode(['result' => $result]));
        return $response;
    }

}
