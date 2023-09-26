import React, { ComponentProps, FC, ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import s from './filters-modal.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ArrowBack } from '@/src/assets/icons/arrow-back-icon'
import DescriptionModal from '@/src/components/profile/new-post/add-description/add-description-modal'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'

export type ModalProps = {
  image: string
  open: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
} & ComponentProps<'div'>

const FiltersModal: FC<ModalProps> = ({
  image,
  showSeparator = true,
  onAction,
  onCancel,
  open,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
}) => {
  const classNames = {
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
  }
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const { t } = useTranslate()
  const actionButtonHandler = () => {
    onAction?.()
  }
  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onCancelHandler() {
    onCancel?.()
  }

  return (
    <div>
      <Button variant="text" className={s.nextButton} onClick={() => setIsFiltersModalOpen(true)}>
        {t.profile.next}
      </Button>
      <Dialog open={isFiltersModalOpen}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <button className={s.arrowButton} onClick={onCancelHandler}>
                <ArrowBack />
              </button>
              <div className={s.next}>
                <DescriptionModal
                  open={isModalOpen}
                  onCancel={cancelButtonHandler}
                  title="Publication"
                />
              </div>
              <DialogTitle className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
                <Separator className={classNames.separator} />
              </DialogTitle>
            </div>

            <div className={s.contentBox}>{children}</div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}

export default FiltersModal // do not export this , instead use dynamic import "Modal" for js bundle reduce
