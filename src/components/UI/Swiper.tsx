import React, { useState, useRef, useEffect, useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper'; // ✅ 타입 import 추가
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';

export interface SwiperItem {
  content: React.ReactNode;
}

export interface SwiperComponentProps {
  /** 슬라이드에 들어갈 아이템 리스트 */
  items: SwiperItem[];
  /** 한 화면에 보일 슬라이드 개수 (기본: 1) */
  slidesPerView?: number | 'auto';
  /** 슬라이드 간격 (px 단위, 기본: 10) */
  spaceBetween?: number;
  /** 슬라이드 속도 (기본 300ms) */
  speed?: number;
  /** 자동 재생 여부 (기본: false) */
  autoplay?: boolean;
  /** 무한루프 여부 (기본: false) */
  loop?: boolean;
  /** 페이지네이션 (점 표시) 여부 (기본: false) */
  pagination?: boolean;
  /** 좌우 네비게이션 버튼 여부 (기본: false) */
  navigation?: boolean;
}

/** Swiper UI 컴포넌트 */
export const SwiperComponent = ({
  items,
  slidesPerView = 1,
  spaceBetween = 10,
  pagination = false,
  navigation = false,
  autoplay = false,
  loop = false,
  speed = 300,
}: SwiperComponentProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const uniqueId = useId(); // 인스턴스별 고유 id
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isFocusInside, setIsFocusInside] = useState(false);

  // autoplay 옵션 객체 (pauseOnMouseEnter 포함)
  const autoplayOption = autoplay
    ? {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    : false;

  // Swiper 인스턴스가 바뀌면 autoplay 상태 동기화
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;
    if (autoplay) {
      s.autoplay.start();
      // setState를 effect 내부에서 바로 바꾸면 eslint 경고 뜨므로 비동기 처리
      setTimeout(() => setIsPlaying(true), 0);
    } else {
      s.autoplay.stop();
      setTimeout(() => setIsPlaying(false), 0);
    }
  }, [autoplay]);

  // 마우스 enter/leave 시 autoplay와 isPlaying 동기화 (pauseOnMouseEnter 보완)
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;

    const el = s.el;
    if (!el) return;

    const onMouseEnter = () => {
      // 현재 autoplay가 작동중이면 멈추고 상태 갱신
      if (s.autoplay && s.autoplay.running) {
        s.autoplay.stop();
        setIsPlaying(false);
      }
    };
    const onMouseLeave = () => {
      // 사용자가 수동으로 멈춘 상태가 아니고, autoplay prop이 true면 재개
      if (autoplay && s.autoplay && !s.autoplay.running) {
        s.autoplay.start();
        setIsPlaying(true);
      }
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [autoplay]);

  // 키보드 제어: 포커스가 내부에 있을 때만 동작하도록 전역 keydown 리스너 사용
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isFocusInside) return;
      const s = swiperRef.current;
      if (!s) return;
      if (e.key === 'ArrowLeft') {
        s.slidePrev();
      } else if (e.key === 'ArrowRight') {
        s.slideNext();
      } else if (e.key === 'Home') {
        s.slideToLoop(0);
      } else if (e.key === 'End') {
        s.slideToLoop(items.length - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFocusInside, items.length]);

  // 재생/정지 버튼 핸들러 (수동 제어)
  const handlePausePlay = () => {
    const s = swiperRef.current;
    if (!s) return;
    if (s.autoplay && s.autoplay.running) {
      s.autoplay.stop();
      setIsPlaying(false);
    } else if (autoplay) {
      // prop으로 autoplay가 허용된 경우에만 start 허용
      s.autoplay.start();
      setIsPlaying(true);
    } else {
      // prop이 false인데 내부에서 수동으로 재생하려는 경우, start는 허용하지 않음.
      // 원하면 이 동작을 허용하도록 변경 가능.
    }
  };

  // Focus in/out 처리: swiper DOM 내부로 들어오면 활성화, 완전히 나가면 비활성화
  const handleFocusIn = () => {
    setIsFocusInside(true);
  };
  const handleFocusOut = (e: React.FocusEvent<HTMLDivElement>) => {
    // relatedTarget이 현재 컨테이너 내부면 아직 내부 포커스임
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsFocusInside(false);
    }
  };

  // 고유 셀렉터 클래스
  const paginationClass = `swiper-pagination-${uniqueId}`;
  const prevClass = `swiper-button-prev-${uniqueId}`;
  const nextClass = `swiper-button-next-${uniqueId}`;

  return (
    <div
      className={`swiper-container ${uniqueId}`}
      aria-roledescription="carousel"
      onFocus={handleFocusIn}
      onBlur={handleFocusOut}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={
          pagination
            ? {
                el: `.${paginationClass}`,
                clickable: true,
                renderBullet: (index, className) =>
                  `<button type="button" class="${className}" aria-label="${
                    index + 1
                  }번째 슬라이드"></button>`,
              }
            : false
        }
        a11y={{
          enabled: true,
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
        }}
        navigation={
          navigation
            ? {
                prevEl: `.${prevClass}`,
                nextEl: `.${nextClass}`,
              }
            : false
        }
        autoplay={autoplayOption}
        speed={speed}
        loop={loop}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // swiper root에 tabIndex(0)를 주어 포커스 가능하게 함
          try {
            swiper.el.tabIndex = 0;
          } catch {
            /* noop */
          }
        }}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={`${uniqueId}-${idx}`} tabIndex={0}>
            {item.content}
          </SwiperSlide>
        ))}
      </Swiper>

      {(autoplay || navigation || pagination) && (
        <div
          className="swiper-controls"
          role="group"
          aria-label="swiper controls"
        >
          {navigation && (
            <button
              className={`swiper-button-prev ${prevClass}`}
              aria-label="이전 슬라이드"
              type="button"
            />
          )}

          {pagination && (
            <div className={`swiper-pagination ${paginationClass}`} />
          )}

          {autoplay && (
            <button
              onClick={handlePausePlay}
              aria-pressed={isPlaying ? 'true' : 'false'}
              aria-label={isPlaying ? '자동재생 정지' : '자동재생 시작'}
              type="button"
            >
              {isPlaying ? '정지' : '재생'}
            </button>
          )}

          {navigation && (
            <button
              className={`swiper-button-next ${nextClass}`}
              aria-label="다음 슬라이드"
              type="button"
            />
          )}
        </div>
      )}
    </div>
  );
};
