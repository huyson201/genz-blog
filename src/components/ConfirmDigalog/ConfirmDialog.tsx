"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LiaTimesCircle } from 'react-icons/lia'

export interface Props {
    isOpen?: boolean,
    onRequestClose?: () => void,
    onConfirm?: () => void,
}
export default function ConfirmDialog({ isOpen, onConfirm, onRequestClose }: Props) {

    function closeModal() {
        onRequestClose?.()
    }

    const handleConfirm = () => {
        onConfirm?.()
        closeModal()
    }


    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg flex items-center justify-center flex-col font-medium leading-6 text-gray-900"
                                    >
                                        <LiaTimesCircle className="text-4xl text-red-500" />
                                        <div>Are you sure?</div>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-center text-gray-500">
                                            Do you really want to delete these records? This process cannot be undone.
                                        </p>
                                    </div>

                                    <div className="mt-4 text-center space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue px-4 text-white py-2 text-sm font-medium text-blue-900"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 text-white px-4 py-2 text-sm font-medium "
                                            onClick={handleConfirm}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
