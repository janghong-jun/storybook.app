import { useEffect, useState } from 'react'

// 전역 모달 스택
const modalStack: string[] = []
const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach(listener => listener())
}

export function useModalStack(id: string, isOpen: boolean) {
  const [isTopModal, setIsTopModal] = useState(false)
  const [zIndex, setZIndex] = useState(9999)

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 스택에서 제거
      const index = modalStack.indexOf(id)
      if (index > -1) {
        modalStack.splice(index, 1)
        notifyListeners()
      }
      return
    }

    // 모달이 열릴 때 스택에 추가
    if (!modalStack.includes(id)) {
      modalStack.push(id)
      notifyListeners()
    }

    // 리스너 등록
    const updateTopModal = () => {
      const isTop = modalStack[modalStack.length - 1] === id
      const currentZIndex = 9999 + modalStack.indexOf(id)
      
      setIsTopModal(isTop)
      setZIndex(currentZIndex)
      
      // 백드랍 업데이트
      requestAnimationFrame(() => {
        const backdrops = document.querySelectorAll('.modal-backdrop, .alert-backdrop')
        backdrops.forEach((backdrop) => {
          const modalId = backdrop.getAttribute('data-modal-id')
          if (modalId === id) {
            backdrop.setAttribute('data-top-modal', isTop ? 'true' : 'false')
          }
        })
      })
    }

    listeners.add(updateTopModal)
    updateTopModal()

    return () => {
      listeners.delete(updateTopModal)
      const index = modalStack.indexOf(id)
      if (index > -1) {
        modalStack.splice(index, 1)
        notifyListeners()
      }
    }
  }, [id, isOpen])

  return {
    isTopModal,
    zIndex,
  }
}