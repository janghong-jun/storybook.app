'use client'

import DefaultLayout from '@/components/layout/DefaultLayout'
import Image from 'next/image'
import React from 'react'
import styles from './pages.module.scss'
import { useState } from 'react'
import { useViewport } from '@/contexts/viewPortContext'

import { Button } from '@/components/UI/Button'
import { Accordion } from '@/components/UI/Accordion'
import { Tooltip } from '@/components/UI/Tooltip'
import { Modal } from '@/components/UI/Modal'
import { SystemAlert } from '@/components/UI/SystemAlert'
import { Toast } from '@/components/UI/Toast'
import { Breadcrumb } from '@/components/UI/Breadcrumb'
import { Pagination } from '@/components/UI/Pagination'
import { Table } from '@/components/UI/Table'
import { BoardList } from '@/components/UI/BoardList'
import { Card } from '@/components/UI/Card'
import { CardList } from '@/components/UI/CardList'
import { Divider } from '@/components/UI/Divider'
import { Tab } from '@/components/UI/Tab'
import { SwiperComponent } from '@/components/UI/Swiper'
import { Checkbox } from '@/components/Form/Checkbox'
import { Switch } from '@/components/Form/Switch'
import { RadioGroup } from '@/components/Form/RadioGroup'
import { TextArea } from '@/components/Form/TextArea'
import { SelectBox } from '@/components/Form/Selectbox'
import { DateRangePicker } from '@/components/Form/DateRangePicker'
import { Input } from '@/components/Form/Input'

export default function TestPage() {
  const { viewport } = useViewport()

  const [alertOpen, setAlertOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [page, setPage] = useState(1)
  const [checked, setChecked] = useState(false)
  const [selected, setSelected] = useState<string>()
  const [value, setValue] = useState<string | number>()
  const [text, setText] = useState('')

  // Input 컴포넌트들 상태 관리 추가
  const [inputValue, setInputValue] = useState('') // 기본 Input 상태
  const [inputEmail, setInputEmail] = useState('') // 이메일용
  const [inputPassword, setInputPassword] = useState('')
  const [inputNumber, setInputNumber] = useState('')
  const [inputTextDisabled, setInputTextDisabled] = useState('수정 불가')
  const [inputReadOnly] = useState('읽기만 가능')
  const [inputLabelHidden, setInputLabelHidden] = useState('')
  const [inputCheckValue, setInputCheckValue] = useState('')
  const [inputCheckError, setInputCheckError] = useState('')
  const mockData = [
    {
      title: '클린한 UI 구성 가이드',
      description: '프론트 개발자가 꼭 알아야 할 UI 패턴들을 정리했습니다.',
      imageUrl: 'https://picsum.photos/seed/card1/600/300',
      altText: 'UI 패턴 이미지',
      linkUrl: '/guide/ui',
    },
    {
      title: 'Next.js 퍼포먼스 최적화',
      description: '이미지 최적화부터 라우팅 전략까지 한 번에 보기.',
      imageUrl: 'https://picsum.photos/seed/card2/600/300',
      altText: 'Next.js 퍼포먼스 이미지',
      linkUrl: '/guide/performance',
    },
    {
      title: 'React 상태 관리 전략',
      description: 'Context, Zustand, Jotai 등 상태 관리 선택 기준.',
      imageUrl: 'https://picsum.photos/seed/card3/600/300',
      altText: 'React 상태 관리 이미지',
      linkUrl: '/guide/state',
    },
    {
      title: 'UI 컴포넌트 시스템 만들기',
      description: 'Button부터 Modal까지 컴포넌트 설계 정석.',
      imageUrl: 'https://picsum.photos/seed/card4/600/300',
      altText: '컴포넌트 설계 이미지',
      linkUrl: '/guide/components',
    },
    {
      title: 'SCSS 구조 설계 팁',
      description: '믿고 쓰는 폴더 구조 + 네이밍 룰.',
      imageUrl: 'https://picsum.photos/seed/card5/600/300',
      altText: 'SCSS 구조 이미지',
      linkUrl: '/guide/scss',
    },
  ]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = { name: '', email: '' }

    if (!name) {
      newErrors.name = '이름을 입력해주세요'
    }

    if (!email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    setErrors(newErrors)

    if (!newErrors.name && !newErrors.email) {
      console.log('제출 성공!', { name, email })
      setIsModalOpen(false)
      resetForm()
    }
  }
  const resetForm = () => {
    setName('')
    setEmail('')
    setErrors({ name: '', email: '' })
  }

  const items = [
    {
      title: 'Button Component',
      content: (
        <section className={styles.sectionRow}>
          <Button
            label="primary 버튼"
            level="primary"
            onClick={() => alert('클릭!')}
          />
          <Button label="secondary" level="secondary" />
          <Button label="tertiary" level="tertiary" />
        </section>
      ),
    },
    {
      title: 'Modal, SystemAlert, Toast Components',
      content: (
        <section className={`${styles.sectionRow} ${styles.modalSection}`}>
          <Button label="모달 열기" onClick={() => setIsModalOpen(true)} />
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              resetForm()
              setIsModalOpen(false)
            }}
            label="프로필 설정"
            size="medium"
          >
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <Input
                label="이름"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />

              <Input
                label="이메일"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <button type="submit">저장</button>
            </form>
          </Modal>
          <Button label="알럿 열기" onClick={() => setAlertOpen(true)} />
          <SystemAlert
            visible={alertOpen}
            message="저장되었습니다."
            onClose={() => setAlertOpen(false)}
          />
          <Button label="컨펌 열기" onClick={() => setConfirmOpen(true)} />
          <SystemAlert
            visible={confirmOpen}
            message="이 동작은 되돌릴 수 없습니다."
            title={'false'}
            hasConfirm={true}
            hasCancel={true}
            confirmLabel="삭제"
            cancelLabel="취소"
            onConfirm={() => {
              console.log('삭제 실행')
              setConfirmOpen(false)
            }}
            onCancel={() => {
              console.log('사용자 취소')
              setConfirmOpen(false)
            }}
          />
          <Button label="토스트 열기" onClick={() => setShowToast(true)} />
          <Toast
            message="작업이 완료되었습니다!"
            visible={showToast}
            onClose={() => setShowToast(false)}
          />
        </section>
      ),
    },
    {
      title: 'Tooltip Component',
      content: (
        <section className={`${styles.sectionRow} ${styles.tooltipSection}`}>
          <Tooltip content="툴팁 내용" label="툴팁" />
          <Tooltip content="툴팁 내용" label="툴팁" iconClass="icon-info" />
        </section>
      ),
    },
    {
      title: 'Breadcrumb Component',
      content: (
        <section className={styles.section}>
          <Breadcrumb
            items={[
              { label: 'UI 컴포넌트', href: '/ui' },
              { label: '테스트', href: '/ui/test' },
            ]}
          />
        </section>
      ),
    },
    {
      title: 'Pagination Component',
      content: (
        <section className={styles.section}>
          {viewport === 'mobile' ? (
            <Pagination
              total={1000}
              perPage={20}
              currentPage={page}
              onPageChange={setPage}
              showCount={1}
            />
          ) : (
            <Pagination
              total={1000}
              perPage={10}
              currentPage={page}
              onPageChange={setPage}
              showCount={3}
            />
          )}
        </section>
      ),
    },
    {
      title: 'Table Component',
      content: (
        <section className={`${styles.section} ${styles.tableSection}`}>
          <Table
            type="horizontal"
            headData={[
              [
                { content: '이름', isHeader: true },
                { content: '나이', isHeader: true },
                { content: '직업', isHeader: true },
                { content: '지역', isHeader: true },
              ],
            ]}
            bodyData={[
              [
                { content: '김철수' },
                { content: '25' },
                { content: '개발자' },
                { content: '서울' },
              ],
              [
                { content: '이영희' },
                { content: '30' },
                { content: '디자이너' },
                { content: '부산' },
              ],
              [
                { content: '박민수' },
                { content: '28' },
                { content: '마케터' },
                { content: '대구' },
              ],
            ]}
            colWidths={[]}
          />
        </section>
      ),
    },
    {
      title: 'Card Component',
      content: (
        <section className={styles.section}>
          <Card
            altText="Landscape"
            description="A stunning view of mountains and lake at sunset."
            imageUrl="https://picsum.photos/seed/slide1/600/300?w=1200&q=75"
            linkUrl="www.daum.net"
            target="_blank"
            title="Beautiful Landscape"
          />
        </section>
      ),
    },
    {
      title: 'CardList Component',
      content: (
        <section className={`${styles.section} ${styles.cardListSection}`}>
          <CardList cards={mockData} columns={3} gap={12} />
        </section>
      ),
    },
    {
      title: 'boardList Component',
      content: (
        <section className={styles.section}>
          <BoardList
            items={[
              {
                description: '중요한 공지입니다.',
                linkUrl: 'naver.com',
                title: '공지사항 1',
                target: '_blank',
              },
              {
                linkUrl: '/notice/2',
                title: '공지사항 2',
              },
              {
                description: '업데이트 안내',
                linkUrl: '/notice/3',
                title: '공지사항 3',
              },
            ]}
          />
        </section>
      ),
    },
    {
      title: 'Checkbox Component',
      content: (
        <section className={styles.sectionRow}>
          <Checkbox label="체크박스" checked={checked} onChange={setChecked} />
          <Checkbox
            label="체크박스2"
            onChange={() => console.log('체크박스2')}
          />
          <Checkbox
            label="체크박스3"
            onChange={() => console.log('체크박스3')}
            checked={true}
          />
          <Switch label="스위치" checked={checked} onChange={setChecked} />
        </section>
      ),
    },
    {
      title: 'RadioGroup Component',
      content: (
        <section className={styles.section}>
          <RadioGroup
            options={[
              { label: '옵션1', value: 'option1' },
              { label: '옵션2', value: 'option2' },
            ]}
            selectedValue={selected}
            onChange={setSelected}
          />
        </section>
      ),
    },
    {
      title: 'TextArea Component',
      content: (
        <section className={styles.section}>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="내용"
            maxLength={500}
            showCounter
          />
        </section>
      ),
    },
    {
      title: 'SelectBox Component',
      content: (
        <>
          <section className={`${styles.section} ${styles.selectBoxSection}`}>
            <h4>커스텀 셀렉트</h4>
            <SelectBox
              options={[
                { label: '옵션 1', value: 'option1' },
                { label: '옵션 2', value: 'option2' },
                { label: '옵션 3', value: 'option3' },
              ]}
              placeholder="선택하세요"
              value={value}
              onChange={setValue}
            />
            <h4>기본 셀렉트</h4>
            <SelectBox
              options={[
                { label: '옵션 1', value: 'option1' },
                { label: '옵션 2', value: 'option2' },
                { label: '옵션 3', value: 'option3' },
              ]}
              placeholder="선택하세요"
              value={value}
              onChange={setValue}
              custom={false}
            />
          </section>
        </>
      ),
    },
    {
      title: 'DateRangePicker Component',
      content: (
        <section className={`${styles.section} ${styles.datePickerSection}`}>
          <DateRangePicker
            holidays={[
              new Date(2025, 1, 1),
              new Date(2025, 3, 1),
              new Date(2025, 5, 5),
              new Date(2025, 6, 6),
              new Date(2025, 8, 15),
              new Date(2025, 10, 3),
              new Date(2025, 10, 9),
              new Date(2025, 12, 25),
            ]}
          />
          <DateRangePicker
            type="range"
            holidays={[
              new Date(2025, 1, 1),
              new Date(2025, 3, 1),
              new Date(2025, 5, 5),
              new Date(2025, 6, 6),
              new Date(2025, 8, 15),
              new Date(2025, 10, 3),
              new Date(2025, 10, 9),
              new Date(2025, 12, 25),
            ]}
          />
        </section>
      ),
    },
    {
      title: 'Input Component',
      content: (
        <section className={styles.section}>
          {/* 이름 */}
          <Input
            clearable
            label="이름"
            placeholder="이름을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          {/* 이메일 */}
          <Input
            label="이메일"
            type="email"
            placeholder="이메일 입력"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />

          {/* 비밀번호 */}
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />

          {/* 숫자 입력 */}
          <Input
            label="숫자 입력"
            type="number"
            placeholder="숫자 입력"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />

          {/* 외부에서 강제 error 제어하는 케이스 */}
          {/* disabled */}
          <Input
            label="비활성 상태"
            value={inputTextDisabled}
            disabled
            onChange={(e) => setInputTextDisabled(e.target.value)}
          />

          {/* readOnly */}
          <Input label="읽기 전용" value={inputReadOnly} readOnly />

          {/* labelHidden */}
          <Input
            label="숨겨진 레이블"
            labelHidden
            placeholder="레이블이 시각적으로 숨겨졌습니다."
            value={inputLabelHidden}
            onChange={(e) => setInputLabelHidden(e.target.value)}
          />

          {/* Error */}
          <Input
            label="에러 상태(test 입력시 통과)"
            value={inputCheckValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value
              setInputCheckValue(val)
              if (val === '') {
                setInputCheckError('값을 입력하세요')
              } else if (val !== 'test') {
                setInputCheckError('올바른 값을 입력하세요')
              } else {
                setInputCheckError('')
              }
            }}
            error={inputCheckError}
          />
        </section>
      ),
    },
    {
      title: 'Divider Component',
      content: (
        <section className={styles.section}>
          <Divider type="solid" />
          <Divider type="dashed" />
          <Divider type="dotted" />
          <Divider color="dark" />
          <Divider color="gray" />
          <Divider color="primary" />
          <Divider thickness="thin" />
          <Divider thickness="medium" />
          <Divider thickness="thick" />
        </section>
      ),
    },
    {
      title: 'Tab Component',
      content: (
        <section className={styles.section}>
          <Tab
            items={[
              {
                content: 'Home Content',
                label: 'Home',
              },
              {
                content: 'Profile Content',
                label: 'Profile',
              },
              {
                content: 'Settings Content',
                disabled: true,
                label: 'Settings',
              },
            ]}
          />
        </section>
      ),
    },
    {
      title: 'Swiper Component',
      content: (
        <section className={styles.section}>
          <SwiperComponent
            items={[
              {
                content: (
                  <Image
                    src="https://picsum.photos/seed/slide1/600/300"
                    alt="푸른 바다가 보이는 해변 풍경"
                    width={600}
                    height={300}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      borderRadius: '1rem',
                      objectFit: 'cover',
                      verticalAlign: 'top',
                    }}
                    loading="eager"
                  />
                ),
              },
              {
                content: (
                  <Image
                    src="https://picsum.photos/seed/slide2/600/300"
                    alt="숲속 햇살이 비치는 길"
                    width={600}
                    height={300}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      borderRadius: '1rem',
                      objectFit: 'cover',
                      verticalAlign: 'top',
                    }}
                    loading="eager"
                  />
                ),
              },
              {
                content: (
                  <Image
                    src="https://picsum.photos/seed/slide3/600/300"
                    alt="도심의 야경"
                    width={600}
                    height={300}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      borderRadius: '1rem',
                      objectFit: 'cover',
                      verticalAlign: 'top',
                    }}
                    loading="eager"
                  />
                ),
              },
            ]}
            navigation
            pagination
          />
        </section>
      ),
    },
  ]

  return (
    <DefaultLayout>
      <div className={styles.demoPage}>
        <h1>UI 컴포넌트 테스트</h1>

        <section className={styles.section}>
          <Accordion
            items={items}
            allowMultipleOpen
            initiallyAllOpen={false}
            showToggleAll
            className={styles.accordionTest}
          />
        </section>
      </div>
    </DefaultLayout>
  )
}
