'use client'

import { useViewport } from '@/contexts/viewPortContext'
import React, { useState } from 'react'
import { Modal } from '@/components/UI/Modal'
import { SystemAlert } from '@/components/UI/SystemAlert'

export default function NoLayoutPage() {
  const { viewport } = useViewport()
  const [openModal, setOpenModal] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className={`wrap ${viewport ?? ''}`}>
      <main id="main" role="main">
        <h1>NoLayout Page</h1>
        <p>이 페이지는 헤더/푸터 없이 표시됩니다.</p>
        <button
          type="button"
          className="btn "
          onClick={() => setOpenModal(true)}
        >
          팝업
        </button>
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          label="예제 모달"
        >
          <p>이것은 모달 내용입니다.</p>
          <button
            type="button"
            className="btn "
            onClick={() => setAlertOpen(true)}
          >
            팝업
          </button>
        </Modal>
        <SystemAlert
          visible={alertOpen}
          onClose={() => {
            setConfirmOpen(true)
            setOpenModal(true)
            setAlertOpen(true)
          }}
          title="알림 제목"
          message="이것은 알림 메시지입니다."
        />
        <SystemAlert
          visible={confirmOpen}
          message="저장되었습니다."
          hasConfirm={true}
          hasCancel={true}
          onClose={() => {
            setConfirmOpen(false)
            setOpenModal(false)
            setAlertOpen(false)
          }}
          confirmLabel="삭제"
          cancelLabel="취소"
          onConfirm={() => {
            setConfirmOpen(false)
          }}
          onCancel={() => {
            setConfirmOpen(false)
          }}
        />
      </main>
    </div>
  )
}
