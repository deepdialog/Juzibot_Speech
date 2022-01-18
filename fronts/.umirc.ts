import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/file/:id',
      component: '@/pages/Files/index.jsx',
      title: '你的文件',
    },
    {
      path: '/search_file/:id/:keyword',
      component: '@/pages/SearchFile/index.jsx',
      title: '查找文件',
    },
    {
      path: '/intent/:id',
      component: '@/pages/Intents/index.jsx',

      title: '对话',
    },
    {
      path: '/Example',
      component: '@/pages/Example/index.jsx',
      title: '测试',
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
  fastRefresh: {},
});
