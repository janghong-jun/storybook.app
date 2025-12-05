const focusStack: Array<HTMLElement | null> = []

export const focusManager = {
  /**
   * 현재 포커스된 엘리먼트를 스택에 저장합니다.
   */
  push: () => {
    focusStack.push(document.activeElement as HTMLElement)
  },

  /**
   * 스택에서 마지막으로 저장된 엘리먼트를 가져와 포커스를 맞춥니다.
   */
  popAndFocus: () => {
    const elementToFocus = focusStack.pop()

    // 엘리먼트가 여전히 DOM에 있고, 포커스를 받을 수 있는 상태인지 확인합니다.
    if (elementToFocus && document.body.contains(elementToFocus)) {
      elementToFocus.focus()
    }
  },
}
