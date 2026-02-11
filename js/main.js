// ===================================
// ポートフォリオサイト - メインJavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
  initProjectModal();
});

// ===================================
// ナビバーのスクロールエフェクト
// ===================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // スクロール時にscrolledクラスを追加
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // スクロール位置に基づいてアクティブなナビリンクを更新
    updateActiveNavLink(sections, navLinks);
  });
}

function updateActiveNavLink(sections, navLinks) {
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===================================
// スムーズスクロール
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // モバイルメニューが開いている場合は閉じる
        document.querySelector('.nav-menu').classList.remove('active');
      }
    });
  });
}

// ===================================
// スクロールアニメーション（Intersection Observer）
// ===================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// ===================================
// モバイルメニューの切り替え
// ===================================
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // メニュー外をクリックした時にメニューを閉じる
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

// ===================================
// ユーティリティ: 作品アイテムの追加（将来の使用のため）
// ===================================
function addWorkItem(work) {
  const worksGrid = document.querySelector('.works-grid');
  const emptyState = worksGrid.querySelector('.works-empty');

  if (emptyState) {
    emptyState.remove();
  }

  const workCard = document.createElement('article');
  workCard.className = 'work-card fade-in';
  workCard.innerHTML = `
    <div class="work-thumbnail">
      ${work.thumbnail
      ? `<img src="${work.thumbnail}" alt="${work.title}">`
      : '<div class="work-thumbnail-placeholder">?</div>'
    }
    </div>
    <div class="work-info">
      <h3 class="work-title">${work.title}</h3>
      <p class="work-description">${work.description}</p>
      <div class="work-tags">
        ${work.tags.map(tag => `<span class="work-tag">${tag}</span>`).join('')}
      </div>
      <div class="work-links">
        ${work.github ? `<a href="${work.github}" class="work-link" target="_blank"><i class="devicon-github-original"></i> GitHub</a>` : ''}
        ${work.demo ? `<a href="${work.demo}" class="work-link" target="_blank">? Demo</a>` : ''}
      </div>
    </div>
  `;

  worksGrid.appendChild(workCard);

  // アニメーションを発火
  setTimeout(() => workCard.classList.add('visible'), 100);
}

// ===================================
// プロジェクトモーダル
// ===================================

// プロジェクトデータ（後で実際のデータに置き換え）
const projectsData = {
  project1: {
    title: 'PinballBattle',
    description: '就職作品として作成しているピンボールゲームです。コード品質を重視した開発を行いました。',
    tags: ['C++', 'DirectX'],
    meta: {
      period: '2025/12~',
      team: '個人制作',
      role: 'すべて'
    },
    gallery: [
      // プレイ動画
      { type: 'youtube', videoId: '51gza8n9dzo' },
      // ゲーム画面（画像）
      { type: 'image', src: 'images/pinballbattle/pinballbattle-screenshot1.png', alt: 'ゲーム画面1' },
      { type: 'image', src: 'images/pinballbattle/pinballbattle-screenshot2.png', alt: 'ゲーム画面2' },
      { type: 'image', src: 'images/pinballbattle/pinballbattle-screenshot3.png', alt: 'ゲーム画面3' },
    ],
    sections: [
      {
        // どのようなプロジェクトか、なぜ作ったのか、どのようなこだわりがあるかを説明する
        // 何 → なぜ → どうやって？ を説明する
        heading: '概要',
        items: [
          'フリッパーで球を弾き、現れる敵を倒して高スコアを目指すピンボールゲームです。' +
          '自分の課題であると感じた設計力を培うため、コードの拡張性と保守性にこだわり開発しました。' +
          'Unityのコンポーネントアーキテクチャを参考に、Transform / Collider / Rendererなどを自前実装しています。'
        ]
      },
      {
        heading: '工夫した点',
        items: [
          'Unityを参考にし、Transform / Collider / Renderer / GameObject を DirectX 上で自前実装',
          '物理 / 描画 / ロジックを明確に分け、拡張しやすいフレームワークを構築',
          'コライダー表示・デバッグ描画により迅速な検証が可能な環境を整備',
          '可読性と保守性を重視したコメントをつけるように意識',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '学んだこと',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
    ],
    // 各種リンク
    links: {
      github: 'https://github.com/yuzu00117/PinballGame',
      // youtube: 'https://youtube.com/watch?v=...'
    }
  },
  project2: {
    title: '妖魔一閃',
    description: '学内の共同制作で開発した3D/2Dアクションゲームです。ライン移動とダッシュ攻撃を駆使してハイスコアを目指します。',
    tags: ['C#', 'Unity'],
    meta: {
      period: '2025/04 - 2025/07',
      team: '15人（プログラマー6人、プランナー2人、デザイナー7人）',
      role: 'プログラマー'
    },
    gallery: [
      { type: 'youtube', videoId: 'wpPjdlnlu3U' },
      { type: 'image', src: 'images/youmaissenn/youmaissenn-screenshot1.png', alt: 'ゲーム画面1' },
      { type: 'image', src: 'images/youmaissenn/youmaissenn-screenshot2.png', alt: 'ゲーム画面2' },
      { type: 'image', src: 'images/youmaissenn/youmaissenn-screenshot3.png', alt: 'ゲーム画面3' },
    ],
    sections: [
      {
        heading: '概要',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '工夫した点',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '学んだこと',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
    ],
    links: {
      github: 'https://github.com/yuzu00117/2025Gamejam'
    }
  },
  project3: {
    title: 'SoulAnchor',
    description: '学内での共同制作で開発した、2D横スクロールアクションです。錨ならではのアクションを楽しみながらステージを進んでいきます。',
    tags: ['C++', 'DirectX'],
    meta: {
      period: '2024/09 - 2025/02',
      team: '12人',
      role: 'プログラマー'
    },
    gallery: [
      { type: 'youtube', videoId: 'Q0mgrDd89GE' },
      { type: 'image', src: 'images/soulanchor/soulanchor-screenshot1.png', alt: 'ゲーム画面1' },
      { type: 'image', src: 'images/soulanchor/soulanchor-screenshot2.png', alt: 'ゲーム画面2' },
      { type: 'image', src: 'images/soulanchor/soulanchor-screenshot3.png', alt: 'ゲーム画面3' },
    ],
    sections: [
      {
        heading: '概要',
        items: [
          '錨を投げてものを倒す独自のアクションでステージを攻略する、2D横スクロールアクションゲームです。' +
          'チーム制作の経験を積むことを目的に、12人チームで開発しました。' +
          'プログラマーとして企画から実装までを担当し、Gitでのコード管理も行いました。'
        ]
      },
      {
        heading: '工夫した点',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          'GitでのPRレビュー・承認など、コード品質の管理',
          'これは例文です',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '学んだこと',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
    ],
    links: {
      github: 'https://github.com/yuzu00117/2025_HEW'
    }
  },
  project4: {
    title: 'Tetris-rs',
    description: 'Rustの学習を目的に個人で作成したテトリスゲームです。新しい言語に挑戦してみたいという思いから開発に取り組みました。',
    tags: ['Rust'],
    meta: {
      period: '2024/07 - 2024/08',
      team: '個人制作',
      role: 'すべて'
    },
    gallery: [
      { type: 'image', src: 'images/tetris-rs/tetris-rs-screenshot1.png', alt: 'ゲーム画面1' },
      { type: 'image', src: 'images/tetris-rs/tetris-rs-screenshot2.png', alt: 'ゲーム画面2' },
      { type: 'image', src: 'images/tetris-rs/tetris-rs-screenshot3.png', alt: 'ゲーム画面3' },
    ],
    sections: [
      {
        heading: '概要',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '工夫した点',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
      {
        heading: '学んだこと',
        items: [
          'これは例文です',
          'これは例文です',
        ]
      },
    ],
    links: {
      github: 'https://github.com/yuzu00117/tetris_rs'
    }
  }
};

let currentSlideIndex = 0;

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalClose = modal.querySelector('.modal-close');
  const prevBtn = modal.querySelector('.gallery-prev');
  const nextBtn = modal.querySelector('.gallery-next');
  const workCards = document.querySelectorAll('.work-card[data-project-id]');

  // カードクリックでモーダルを開く
  workCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // リンクをクリックした場合はモーダルを開かない
      if (e.target.closest('.work-link')) {
        return;
      }

      const projectId = card.dataset.projectId;
      const project = projectsData[projectId];
      if (project) {
        openModal(project);
      }
    });
  });

  // モーダルを閉じる
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ギャラリーナビゲーション
  prevBtn.addEventListener('click', () => navigateGallery(-1));
  nextBtn.addEventListener('click', () => navigateGallery(1));
}

function openModal(project) {
  const modal = document.getElementById('projectModal');

  // タイトル
  document.getElementById('modalTitle').textContent = project.title;

  // 説明
  document.getElementById('modalDescription').textContent = project.description;

  // 詳細セクション
  const sectionsContainer = document.getElementById('modalSections');
  sectionsContainer.innerHTML = '';
  if (project.sections) {
    project.sections.forEach(section => {
      sectionsContainer.innerHTML += `
        <div class="modal-section">
          <h3 class="modal-section-heading">${section.heading}</h3>
          <ul class="modal-section-list">
            ${section.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
    });
  }

  // メタ情報
  const metaContainer = document.getElementById('modalMeta');
  metaContainer.innerHTML = '';
  if (project.meta) {
    if (project.meta.period) {
      metaContainer.innerHTML += `
        <div class="modal-meta-item">
          <span class="modal-meta-label">開発期間</span>
          <span class="modal-meta-value">${project.meta.period}</span>
        </div>
      `;
    }
    if (project.meta.team) {
      metaContainer.innerHTML += `
        <div class="modal-meta-item">
          <span class="modal-meta-label">チーム</span>
          <span class="modal-meta-value">${project.meta.team}</span>
        </div>
      `;
    }
    if (project.meta.role) {
      metaContainer.innerHTML += `
        <div class="modal-meta-item">
          <span class="modal-meta-label">担当</span>
          <span class="modal-meta-value">${project.meta.role}</span>
        </div>
      `;
    }
  }

  // タグ
  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = project.tags
    .map(tag => `<span class="modal-tag">${tag}</span>`)
    .join('');

  // リンク
  const linksContainer = document.getElementById('modalLinks');
  linksContainer.innerHTML = '';
  if (project.links) {
    if (project.links.github) {
      linksContainer.innerHTML += `
        <a href="${project.links.github}" class="modal-link" target="_blank" rel="noopener noreferrer">
          <i class="devicon-github-original"></i> GitHub
        </a>
      `;
    }
    if (project.links.demo) {
      linksContainer.innerHTML += `
        <a href="${project.links.demo}" class="modal-link primary" target="_blank" rel="noopener noreferrer">
          🔗 Demo
        </a>
      `;
    }
    if (project.links.youtube) {
      linksContainer.innerHTML += `
        <a href="${project.links.youtube}" class="modal-link" target="_blank" rel="noopener noreferrer">
          ▶️ YouTube
        </a>
      `;
    }
  }

  // ギャラリー
  setupGallery(project.gallery);

  // モーダルを表示
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
  currentSlideIndex = 0;
}

function setupGallery(galleryItems) {
  const slidesContainer = document.getElementById('gallerySlides');
  const dotsContainer = document.getElementById('galleryDots');

  slidesContainer.innerHTML = '';
  dotsContainer.innerHTML = '';
  currentSlideIndex = 0;

  if (!galleryItems || galleryItems.length === 0) {
    // デフォルトのプレースホルダー
    slidesContainer.innerHTML = `
      <div class="gallery-slide">
        <div class="gallery-slide-placeholder">📷</div>
      </div>
    `;
    return;
  }

  galleryItems.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';

    if (item.type === 'image') {
      slide.innerHTML = `<img src="${item.src}" alt="${item.alt || ''}">`;
    } else if (item.type === 'youtube') {
      slide.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${item.videoId}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
    } else if (item.type === 'placeholder') {
      slide.innerHTML = `<div class="gallery-slide-placeholder">${item.icon || '📷'}</div>`;
    }

    slidesContainer.appendChild(slide);

    // ドットを追加
    if (galleryItems.length > 1) {
      const dot = document.createElement('div');
      dot.className = `gallery-dot${index === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    }
  });

  updateGalleryPosition();
}

function navigateGallery(direction) {
  const slides = document.querySelectorAll('.gallery-slide');
  if (slides.length <= 1) return;

  currentSlideIndex += direction;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  } else if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }

  updateGalleryPosition();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateGalleryPosition();
}

function updateGalleryPosition() {
  const slidesContainer = document.getElementById('gallerySlides');
  const dots = document.querySelectorAll('.gallery-dot');

  slidesContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlideIndex);
  });
}

