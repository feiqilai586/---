// ============================================================
// 作品集数据配置
// 修改此文件即可更新全站内容，无需改动组件代码
// ============================================================

export const profile = {
  name: '罗良禄',
  nameEn: 'Luo Lianglu',
  title: 'E-COMMERCE VISUAL DESIGNER',
  roles: ['视觉设计师', 'AI 设计师', '平面设计师'],
  avatar: 'assets/avatar.jpg',
  // Hero 背景视频 —— 后期替换真实视频时只需改此处路径
  heroVideo: 'assets/hero-bg.mp4',
  // 视频加载前显示动态渐变背景作为兜底
};

export const basicInfo = {
  gender: '男',
  age: '22',
  hometown: '广西',
  location: '佛山',
  education: '大专',
  school: '广西机电职业技术学院',
};

export const contact = {
  phone: '19994772627',
  wechat: 'lll8426468',
  phoneWechatSame: true,
  email: '3454197649@qq.com',
};

// 可核实的项目数据
export const stats = [
  { value: '4+', label: '品牌店铺设计项目' },
  { value: '2', label: '年电商视觉工作经验', suffix: 'YRS' },
  { value: '8+', label: '专业设计技能' },
  { value: '4', label: '设计领域方向' }, // 电商视觉 / 平面 / AI / 文案
];

export const experience = {
  company: '佛山市嘉冠金属制品有限公司',
  period: '2026.3.27-2026.11',
  description: [
    '负责电商活动平面视觉表现设计',
    '品牌形象与推广过程的视觉表现控制',
    '产品、版面、广告等页面的修改创新',
    '电商及运营物料设计（详情页、上新素材、营销活动海报等）',
  ],
};

// 精选项目 —— 后期替换真实作品图时只需修改 image 字段
// 顺序：成人用品 → 珀雅 → VERIDIANE → 宠物猫粮
export const projects = [
  {
    id: 'adult-toys',
    name: '成人情趣用品',
    category: '成人用品详情页设计',
    tag: 'Adult Wellness / E-commerce',
    description:
      '高端成人情趣用品品牌，主打精致、安全、私密的产品理念，面向 25-40 岁都市人群，轻奢定位。以高级暗调视觉营造私密而优雅的氛围。',
    responsibilities: [
      '产品主图与详情页全链路设计',
      '高级暗调氛围感视觉呈现',
      '产品质感与材质表现优化',
      '营销活动海报与推广图设计',
    ],
    image:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3k2e2bubs_ve_miaoda',
    heroImage:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3nicozceu_ve_miaoda',
    detailImages: [
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3ne4nrmgs_ve_miaoda',
    ],
    accent: '#B76E79',
  },
  {
    id: 'poya',
    name: '珀雅',
    category: '护肤品店铺设计',
    tag: 'Skincare / E-commerce',
    description:
      '主打天然科学护肤，有丰富护肤美妆线，面向 18-45 岁女性，中高端定位。先线上推广，后拓线下及国际市场。',
    responsibilities: [
      '线上店铺日常装修设计',
      '节日促销推广活动专题页设计',
      '加强营销视觉效果',
    ],
    image:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3idvdh6jw_ve_miaoda',
    heroImage:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3nmpqfwgw_ve_miaoda',
    detailImages: [
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3npdgsyaw_ve_miaoda',
    ],
    accent: '#5B8A7F',
  },
  {
    id: 'veridiane',
    name: 'VERIDIANE',
    category: '女装店铺设计',
    tag: 'Fashion / E-commerce',
    description:
      '以"简约舒适、富有设计感"为核心，选高品质天然面料，面向 18-35 岁都市女性，中高端定位。',
    responsibilities: [
      '活动主 KV 设计、主图、推广图设计',
      '线上店铺日常装修美化',
      '节日促销活动专题页设计',
    ],
    image:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3h3wx3yas_ve_miaoda',
    heroImage:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3njcpewfw_ve_miaoda',
    detailImages: [
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3nfijvefs_ve_miaoda',
    ],
    accent: '#D4B896',
  },
  {
    id: 'pet-cat-food',
    name: '宠物猫粮详情页设计',
    category: '宠物食品电商视觉',
    tag: 'Pet / E-commerce',
    description:
      '面向养宠人群的猫粮电商视觉设计，详情页与主图全链路输出，突出产品卖点与食欲感。暖色调视觉语言，营造温馨有爱的品牌氛围。',
    responsibilities: [
      '详情页设计',
      '主图设计',
      '活动推广视觉',
    ],
    image:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3kx3nagji_ve_miaoda',
    heroImage:
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3nipev4gs_ve_miaoda',
    detailImages: [
      '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3nncyjees_ve_miaoda',
    ],
    accent: '#E07B39',
  },
];

export const advantages = [
  {
    id: 'ecommerce',
    title: '电商视觉',
    subtitle: 'E-COMMERCE VISUAL',
    description: '情趣用品、宠物食物服装、护肤品等多品类电商项目经验，详情页、主图、活动海报全链路设计能力。',
    icon: 'grid',
    accent: '#ff3c7a',
    stats: [
      { label: '详情页', value: 95 },
      { label: '主图 KV', value: 90 },
      { label: '活动页', value: 85 },
    ],
  },
  {
    id: 'brand',
    title: '品牌平面',
    subtitle: 'BRAND GRAPHIC',
    description: '品牌形象视觉把控，推广物料系统设计，具备良好审美与扎实的平面设计功底。',
    icon: 'shape',
    accent: '#c2ff3d',
    stats: [
      { label: '品牌 VI', value: 80 },
      { label: '海报设计', value: 90 },
      { label: '物料延展', value: 85 },
    ],
  },
  {
    id: 'ai',
    title: 'AI 设计',
    subtitle: 'AI AIDED DESIGN',
    description: '熟练掌握 Stable Diffusion、即梦等 AI 绘画与合成工具链，赋能创意产出与效率提升。',
    icon: 'spark',
    accent: '#3cb4ff',
    stats: [
      { label: 'AI 绘画', value: 90 },
      { label: '提示词工程', value: 85 },
      { label: '后期合成', value: 80 },
    ],
  },
  {
    id: 'copywriting',
    title: '文案设计',
    subtitle: 'COPYWRITING DESIGN',
    description: '电商卖点文案、海报标题、详情叙事梳理，图文协同，让视觉表达更有转化力。',
    icon: 'pen',
    accent: '#b76e79',
    stats: [
      { label: '卖点文案', value: 85 },
      { label: '详情叙事', value: 80 },
      { label: '标题撰写', value: 88 },
    ],
  },
];

export const skills = [
  'Photoshop',
  'Illustrator',
  'Blender',
  '豆包',
  '剪映',
  'ChatGPT',
  'Stable Diffusion',
  '即梦',
];

// 兼容浏览器内 Babel 模式（无构建步骤预览）
if (typeof window !== 'undefined') {
  Object.assign(window, {
    profile,
    basicInfo,
    contact,
    stats,
    experience,
    projects,
    advantages,
    skills,
  });
}
