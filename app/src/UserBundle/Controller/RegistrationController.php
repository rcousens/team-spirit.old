<?php
/**
 * Created by IntelliJ IDEA.
 * User: ross
 * Date: 31/01/15
 * Time: 7:17 PM
 */

namespace UserBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Controller\RegistrationController as BaseController;

class RegistrationController extends BaseController
{
    /**
     * @Route("/register", name="user_bundle_register", methods={"POST"}, options={"expose"=true})
     *
     * @param Request $request
     * @return null|RedirectResponse|Response
     */
    public function registerAction(Request $request)
    {
        /** @var $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user = $userManager->createUser();
        $user->setEnabled(true);

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        if (null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $formFactory->createForm();
        $form->setData($user);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);

            $userManager->updateUser($user);
            if (null === $response = $event->getResponse()) {
                $url = $this->generateUrl('fos_user_registration_confirmed');
                $response = new RedirectResponse($url);
            }

            $dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED, new FilterUserResponseEvent($user, $request, $response));

            return new Response(json_encode(['registration' => true]), 200, ['Content-Type' => 'application/json']);
        }

        $formErrors = [];

        foreach ($form as $child) {
            if (!$child->isValid()) {
                foreach($child->getErrors() as $key => $error) {
//                    $template = $error->getMessageTemplate();
//                    $params = $error->getMessageParameters();
//                    foreach ($params as $p => $v) {
//                        $template = str_replace($p, $v, $template);
//                    }
//                    $formErrors[$child->getName()] = $template;
                    $formErrors[$child->getName()] = $error->getMessage();
                }
            }
        }

        return new Response(json_encode(['errors' => $formErrors]), 400, ['Content-Type' => 'application/json']);
    }
}
