import { SaveOptions } from '@/types/type'
import { Popover, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, forwardRef, useImperativeHandle, useState, useCallback } from 'react'
import { BiSolidLockAlt } from 'react-icons/bi'
import { FaEarthAsia } from 'react-icons/fa6'
import { HiChevronDown } from 'react-icons/hi2'

interface Props {
    onSelect?: (select: SaveOptions) => void,
    onChangeSelect?: (select: SaveOptions) => void,
    onSave?: () => void,
    canSave?: boolean,
    defaultValue?: SaveOptions
}

export interface SaveOptionHandles {
    getValue: () => SaveOptions
}

const SaveOption = forwardRef<SaveOptionHandles, Props>(({ canSave, onSave, onChangeSelect, defaultValue = SaveOptions.JUST_ME }, ref) => {
    const [value, setValue] = useState<SaveOptions>(defaultValue)

    useImperativeHandle(ref, () => ({
        getValue() {
            return value
        },
    }), [value])

    const handleSave = useCallback(() => {
        //check if can't save
        if (!canSave) return
        if (onSave) onSave()
    }, [canSave, onSave])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Check if Ctrl (or Cmd) and S keys are pressed
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault(); // Prevent the default browser save action
                handleSave(); // Call your save function
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        // Clean up the listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleSave])

    const handleClickRadio = (radioValue: SaveOptions) => {
        setValue(radioValue)
        onChangeSelect && onChangeSelect(radioValue)
    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-sm bg-on_light_card_bg border border-on_light_border dark:border-on_dark_border dark:bg-on_dark_card_bg px-3 py-1 text-base font-medium text-black dark:text-white hover:text-opacity-100 focus:outline-none `}
                    >
                        <span>Save</span>
                        <HiChevronDown
                            className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute right-0 z-[3] mt-3 w-screen max-w-[320px]  transform pl-6 sm:pl-0">

                            {({ close }) => (
                                <div className="overflow-hidden rounded-md shadow-lg ring-1 border dark:border-on_dark_border ring-black ring-opacity-5">

                                    {
                                        !canSave ? <TestDesc /> : (
                                            <div className='bg-white dark:bg-on_dark_card_bg p-2 text-sm text-on_light_text_gray dark:text-on_dark_text_gray '>
                                                <div className='text-base font-bold'>Publish your post</div>
                                                <div className='mt-1'>Display:</div>
                                                <div className='space-y-1 mt-2 pb-2 border-b dark:border-b-on_dark_border'>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="display-radio-1"
                                                            type="radio"
                                                            name="display"
                                                            defaultChecked={defaultValue === SaveOptions.PUBLIC}
                                                            onClick={() => handleClickRadio(SaveOptions.PUBLIC)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600   dark:bg-gray-700 dark:border-gray-600" />
                                                        <label
                                                            htmlFor="display-radio-1"
                                                            className="ml-2 text-sm cursor-pointer  outline-none text-on_light_text_gray dark:text-on_dark_text_gray">Public</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            defaultChecked={defaultValue === SaveOptions.JUST_ME}
                                                            onClick={() => handleClickRadio(SaveOptions.JUST_ME)}
                                                            id="display-radio-2"
                                                            type="radio"
                                                            name="display"
                                                            className="w-4 h-4 outline-none text-blue bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="display-radio-2" className="ml-2 text-sm cursor-pointer  text-on_light_text_gray dark:text-on_dark_text_gray">Just me</label>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        value === SaveOptions.JUST_ME ? <JustMeOptInfo /> : <PublicOptInfo />
                                                    }
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        handleSave()
                                                        close()
                                                    }}
                                                    className='bg-primary-gradient text-white bg-200% hover:bg-right transition-all rounded-sm px-3 py-1'>
                                                    Save
                                                </button>
                                            </div>

                                        )
                                    }
                                </div>

                            )}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
})

SaveOption.displayName = "SaveOption"

const JustMeOptInfo = () => {
    return (
        <div className='text-xs py-2'>
            <BiSolidLockAlt className="inline-block text-sm mr-1 mb-1" />
            Only you can see this post. Your draft has been automatically saved as you type.
        </div>
    )
}

const PublicOptInfo = () => {
    return (
        <div className='text-xs py-2'>
            <span><FaEarthAsia className="inline-block text-xs mr-1 mb-0.5" /></span>
            Everyone can see your post.
        </div>
    )
}

const TestDesc = () => {
    return (
        <div className='bg-white dark:bg-on_dark_card_bg p-2 text-sm text-on_light_text_gray dark:text-on_dark_text_gray '>
            Add a title, select at least one tag, and start writing something to publish.
        </div>
    )
}
export default SaveOption