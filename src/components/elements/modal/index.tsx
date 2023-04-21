/* eslint-disable no-unused-vars */
import { Transition } from '@headlessui/react';
import { ReactNode, useEffect } from 'react';
import { ICONS } from '~/assets/icons';
import { Spinner } from '../spinner';

interface DialogProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: (...args: any) => void;
}

export type ModalProps = {
    onClose: (...args: any) => void;
};

export const Modal = (props: DialogProps) => {
    const { children, isOpen, onClose } = props;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <Transition
            show={isOpen}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed top-0 left-0 z-50 flex h-full w-full bg-gray-900 bg-opacity-50">
                {children}
            </div>
        </Transition>
    );
};

export const AlertModal = (
    props: DialogProps & {
        title: string;
        action: () => void;
        cancel_button_title: string;
        accept_button_title: string;
        isLoading: boolean;
    }
) => {
    const {
        isOpen,
        onClose,
        action,
        title,
        accept_button_title,
        cancel_button_title,
        isLoading,
    } = props;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const cancel = () => {
        onClose();
    };

    return (
        <Transition
            show={isOpen}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="flex flex-col items-center justify-center gap-5 bg-white p-7">
                    <div className="w-fit rounded-full bg-primary-500 p-7 px-12">
                        <img src={ICONS.Alert} alt="Alert" />
                    </div>
                    <span className="px-2 text-center text-sm">{title}</span>
                    <div className="flex w-full items-center justify-center gap-3 px-5">
                        <button
                            onClick={action}
                            className="flex w-full items-center justify-center bg-red-500 py-2 text-white"
                        >
                            {isLoading ? (
                                <Spinner size="sm" />
                            ) : (
                                accept_button_title
                            )}
                        </button>
                        <button
                            onClick={cancel}
                            className="flex w-full items-center justify-center bg-primary-500 py-2 text-white "
                        >
                            {isLoading ? (
                                <Spinner size="sm" />
                            ) : (
                                cancel_button_title
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    );
};
