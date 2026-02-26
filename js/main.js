// ===================================
// ポートフォリオサイト - メインJavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
  initProjectModal();
  initSwipeCarousels();
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
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });
  }

  // メニューリンクをクリックした時にメニューを閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // メニュー外をクリックした時にメニューを閉じる
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
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
        ${work.tags.map((tag, i) => `<span class="work-tag${i === 0 ? ' category-tag' : ''}">${tag}</span>`).join('')}
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
    tags: ['Game', 'C++', 'DirectX'],
    meta: {
      period: '2025/12~',
      team: '個人制作',
      role: 'すべて'
    },
    gallery: [
      // プレイ動画
      { type: 'youtube', videoId: '2p-NjOfj548' },
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
      // -------------------------------------------------------
      // 【工夫した点 執筆ルール】
      // 1.「何をしたか」＋「その効果」── 事実だけでなくメリットまで一文に含める
      // 2. 技術用語は具体的に ── 「意識した」「心がけた」など抽象表現を避ける
      // 3. 体言止めで統一 ── 語尾を「〜した」「〜を構築」など体言止め風に揃える
      // 4. 概要との重複を避ける ── 概要に書いた内容は角度を変えて書く
      // -------------------------------------------------------
      {
        heading: '工夫した点',
        items: [
          'Unityを参考にし、Transform / Collider / Renderer / GameObject を DirectX 上で自前実装し、オブジェクトを柔軟に変更できる設計',
          '物理 / 描画 / ロジックを明確に分け、拡張しやすいフレームワークを構築し、既存コードへの影響を最小限に抑える設計',
          'コライダーの境界やヒット判定をリアルタイムで可視化するデバッグ描画機能を実装し、検証の効率化',
          '命名規則の統一やファイル構成、コメントの整理を徹底し、第三者が読んでも理解しやすいコードベースを維持',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          '企画・仕様設計',
          'ゲームエンジン設計（Transform / Collider / Renderer等の自前実装',
          '物理演算の実装',
          'デバッグ・最適化',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          'コメントの粒度や記述量の基準がなく試行錯誤を重ね、「自分があったら嬉しいコメント」を軸にした記述方針を確立',
          '拡張性の高い設計の実現方法に悩み、Unityのコンポーネント思想を参考にすることで柔軟な構造を設計',
          'Unityのコンポーネント構造をDirectX上で再現する際、各コンポーネントの責務分離と依存関係の整理に苦戦し、設計を何度も見直して改善'
        ]
      },
      {
        heading: '学んだこと',
        items: [
          '責務の分離やコンポーネント設計を通じて、拡張性・保守性に優れたコードの書き方を習得',
          'Transform・Collider・Rendererなどを自前で実装することで、普段ブラックボックスとして使用していたゲームエンジンの内部処理を深く理解',
          '事前に設計を練ってから実装に入ることの重要性を実感し、設計を固めたうえで実装したコードは変更・機能追加が容易であることを体感',
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
    tags: ['Game', 'C#', 'Unity'],
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
          'ライン移動とダッシュ攻撃を駆使してハイスコアを目指す、3D/2Dアクションゲームです。' +
          '前回のチーム制作での反省を活かし、メンバー間のコミュニケーションやタスク管理を重視することでチーム開発の質を高めることを目指しました。' +
          'メンバーが開発しやすい環境づくりを意識し、15人チームでの円滑な共同制作を実現しました。'
        ]
      },
      {
        heading: '工夫した点',
        items: [
          'プログラマーセクションのPMとして全員の進捗を管理し、15人チームでの円滑な開発を推進',
          '敵やフェーズのパラメーターをインスペクタから調整可能にし、プランナーとの素早いイテレーションを実現',
          'ゲームの完成度を高めるため、ロジック実装に加えエフェクト制作も担当し、演出面の品質を向上'
        ]
      },
      {
        heading: '担当箇所',
        items: [
          'エフェクト制作（ヒット・敵撃破・ダッシュ時の各種エフェクト）',
          '白黒表現のためのポストプロセス制作',
          'ボスエネミーの制作',
          '敵スポナーの実装およびフェーズ切り替えコントローラーの制作',
          'UIシェイク演出の制作',
          '足場のすり抜け処理の追加',
          'GitでのPRレビュー・承認など、コード品質の管理',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          'メンバーごとのスキル差を考慮したタスク分担に取り組んだが、把握が不十分で偏りが生じ、事前のヒアリングや段階的な割り振りの重要性を実感',
          'PRレビューやコーディングルールの策定で品質管理を試みたが、チーム全体への浸透が難しく、ルールの周知方法や運用の仕組みづくりが課題として残存',
          'タスクの遅延や想定外の工数増加への対応に苦戦し、進捗の可視化とこまめな状況確認を取り入れることでスケジュール管理を改善'
        ]
      },
      {
        heading: '学んだこと',
        items: [
          'コーディングルールやPRレビューの仕組みを導入したが、ルールは策定するだけでなくチーム全体に浸透させる運用設計が不可欠であることを実感',
          'メンバーのスキル差を事前にヒアリングし、段階的にタスクを割り振ることでタスク量の偏りを防ぐ必要があることを学習',
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
    tags: ['Game', 'C++', 'DirectX'],
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
      { type: 'image', src: 'images/soulanchor/soulanchor-screenshot4.png', alt: 'ゲーム画面4' },
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
          'プログラマーセクションのPMとしてタスク管理とPRレビューを担い、コード品質の底上げに貢献',
          'チームの進行状況を把握し、未着手・停滞タスクを優先的に引き受けることで全体の進行を維持',
          '命名規則や処理配置のルールを策定・統一し、チーム全体の開発効率を向上',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          'プレイヤーの各種演出制作（スポーン・デスポーンエフェクト、アニメーション制御）',
          'プレイヤーの追尾機能の実装',
          '残機処理およびプレイヤー死亡処理の追加',
          'ボス登場ムービーおよびボスアイコン表示の実装',
          '遺跡ステージ背景の実装およびマップ切り替え機能の制作',
          'リザルト画面のスコア表示の実装',
          '当たり判定処理の実装と接触情報のロジック分離',
          'GitでのPRレビュー・承認など、コード品質の管理',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          '限られた開発期間の中でどの機能を優先すべきか判断が難しく、チーム内で意見が分かれる場面もあり、完成度と納期のバランスを取る難しさを痛感',
          '事前の設計が不十分なまま実装を進めた結果、開発後半に大規模な仕様変更が発生し、手戻りの多さから事前設計の重要性を痛感',
          'プロジェクトに対する温度差がメンバー間で生じ、作業の偏りや進行の停滞につながったことで、チーム全体の士気を保つ難しさに直面'
        ]
      },
      {
        heading: '学んだこと',
        items: [
          'プログラマー・デザイナーなど職種を越えた認識合わせや情報共有が、チーム全体の方向性を揃えるうえで不可欠であることを体感',
          'メンバーごとの技術力や知識量の違いを踏まえた伝え方が求められる場面が多く、チーム開発におけるコミュニケーションの難しさを実感',
          '指示がメンバーに正確に伝わらなかったり、依頼したタスクが期限通りに完了しないケースが生じ、進捗をこまめに確認し合う習慣の重要性を痛感'
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
    tags: ['Game', 'Rust'],
    meta: {
      period: '2024/07 - 2024/08',
      team: '個人制作',
      role: 'すべて'
    },
    gallery: [
      // プレイ動画
      { type: 'youtube', videoId: '9Hu2YMc3OCU' },
      // スクリーンショット
      { type: 'image', src: 'images/tetris-rs/tetris-rs-screenshot1.png', alt: 'ゲーム画面1' },
    ],
    sections: [
      {
        heading: '概要',
        items: [
          'Rustの学習を目的に個人で作成したテトリスゲームです。' +
          '新しい言語への挑戦として、C++とは異なるメモリ管理や型システムを体験するために制作しました。' +
          '2Dフレームワーク macroquad と Docker を活用し、環境に依存しないビルド体制も整えています。'
        ]
      },
      {
        heading: '工夫した点',
        items: [
          '2Dフレームワーク macroquad を採用し、少ないコード量で描画・入力処理を実装',
          'Dockerによるビルド環境を構築し、OS間の環境差異を排除した再現性のある開発体制を整備',
          '所有権・借用による安全なメモリ管理と、列挙型・パターンマッチを活用した堅牢なゲームロジックを実装',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          '企画・仕様設計',
          'ゲームロジックの設計と実装（テトリミノ操作・ライン消去・スコア管理）',
          '描画・入力処理の実装（macroquad）',
          'Dockerによるビルド環境の構築',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          '未経験のRustはCなどと勝手が異なり何から学ぶべきか判断が難しかったが、AIを活用してまず機能を作成し、不明点を都度調べる方法を取ることで効率的に習得',
        ]
      },
      {
        heading: '学んだこと',
        items: [
          'Rustの所有権や借用といったC++にはない概念に触れ、メモリ管理に対する新たな視点を獲得',
        ]
      },
    ],
    links: {
      github: 'https://github.com/yuzu00117/tetris_rs'
    }
  },
  video1: {
    title: 'KOKORO',
    description: '高校時代の友人と起業した会社で作成した映像作品です。実際に仕事をする経験を積むために作成しました。',
    tags: ['Video', 'Premiere Pro', 'After Effects'],
    meta: {
      period: '2023/05 - 2024/03',
      team: '4人',
      role: '企画・撮影・編集・経理'
    },
    gallery: [
      // 動画
      { type: 'youtube', videoId: 'mn3NIoaWZQA' },
      // スクリーンショット
      { type: 'image', src: 'images/KOKORO/KOKORO-screenshot1.png', alt: 'スクリーンショット1' },
      { type: 'image', src: 'images/KOKORO/KOKORO-screenshot2.png', alt: 'スクリーンショット2' },
      { type: 'image', src: 'images/KOKORO/KOKORO-screenshot3.jpg', alt: 'スタジオ写真1' },
    ],
    sections: [
      {
        heading: '概要',
        items: [
          '高校時代の友人と共同設立したクリエイターグループ「NewBizz」におけるクライアント案件の映像作品です。' +
          '実社会での実務を通じて、納期遵守や品質保証といったプロとしての責任感を養うことを目的として制作しました。' +
          '企画・撮影・編集の全工程をワンストップで担当し、クリエイティブとビジネスの両立を経験しました。',
        ]
      },
      {
        heading: '工夫した点',
        items: [
          '予算が限られていたため、大掛かりなセットを組むのではなく、自分たちの得意であるCGやVFXを積極的に活用しました。' +
          '演出の一部をデジタルで補完することで、浮いたリソースを高品質な撮影機材やライティングに充て、被写体の魅力を最大限に引き出すシネマティックな映像表現を追求しました。',
        ]
      },
      {
        heading: '担当箇所',
        items: [
          '企画・撮影・編集・経理',
        ]
      },
      {
        heading: '苦労した点',
        items: [
          'クライアントの要望に応えるだけでなく、自分たちならではのクリエイティブな表現をどう提案し、納得してもらうかというバランスに一番苦労しました。' +
          '限られた条件の中で、いかに妥協せずクオリティを上げるかをチームで模索し続けました。',
        ]
      },
      {
        heading: '学んだこと',
        items: [
          '単に「作る」技術だけでなく、相手の意図を深く汲み取るコミュニケーションの大切さや、共通のゴールに向かって仲間と試行錯誤する達成感を知る、大きな転機となる経験でした。',
        ]
      },
    ],
    links: {
      youtube: 'https://www.youtube.com/watch?v=mn3NIoaWZQA'
    }
  },
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
    .map((tag, i) => `<span class="modal-tag${i === 0 ? ' category-tag' : ''}">${tag}</span>`)
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1em" height="1em" fill="currentColor" style="vertical-align: -0.125em;">
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
          </svg>
          YouTube
        </a>
      `;
    }
  }

  // ギャラリー
  setupGallery(project.gallery);

  // モーダルのスクロール位置をリセット
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.scrollTop = 0;
  }

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


// ===================================
// スワイプカルーセル（Works / Skills）
// ===================================
function initSwipeCarousels() {
  const mediaQuery = window.matchMedia('(max-width: 768px)');

  const carousels = [
    { container: document.querySelector('.works-grid'), itemSelector: '.work-card' },
    { container: document.querySelector('.skills-grid'), itemSelector: '.skill-card' },
  ];

  // 各カルーセルの状態を保持
  const state = carousels.map(() => ({ dotsEl: null, observer: null }));

  function setup() {
    // モバイル以外ならセットアップしない（クリーンアップ）
    if (!mediaQuery.matches) {
      teardown();
      return;
    }

    carousels.forEach((cfg, ci) => {
      const { container, itemSelector } = cfg;
      if (!container) return;

      // 既にセットアップ済みならスキップ
      if (state[ci].dotsEl) return;

      const items = container.querySelectorAll(itemSelector);
      if (items.length <= 1) return;

      // ドットコンテナを作成
      const dotsEl = document.createElement('div');
      dotsEl.className = 'swipe-dots';

      items.forEach((item, i) => {
        const dot = document.createElement('div');
        dot.className = `swipe-dot${i === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => {
          item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
        dotsEl.appendChild(dot);
      });

      // コンテナの後ろにドットを挿入
      container.parentNode.insertBefore(dotsEl, container.nextSibling);
      state[ci].dotsEl = dotsEl;

      // IntersectionObserver でアクティブドットを更新
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(items).indexOf(entry.target);
            // インデックスが見つからない場合はスキップ
            if (idx === -1) return;

            const dots = dotsEl.querySelectorAll('.swipe-dot');
            dots.forEach((d, di) => {
              d.classList.toggle('active', di === idx);
            });
          }
        });
      }, {
        root: container,
        threshold: 0.6, // 60%見えたらアクティブとみなす
      });

      items.forEach(item => observer.observe(item));
      state[ci].observer = observer;
    });
  }

  function teardown() {
    state.forEach((s, ci) => {
      if (s.dotsEl) {
        s.dotsEl.remove();
        s.dotsEl = null;
      }
      if (s.observer) {
        s.observer.disconnect();
        s.observer = null;
      }
    });
  }

  // 初期化
  setup();

  // リサイズ監視（メディアクエリの変化を監視）
  mediaQuery.addEventListener('change', setup);
}
