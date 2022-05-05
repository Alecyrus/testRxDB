import { defineConfig } from 'vite';
import { resolve, join } from 'pathe';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Components from 'unplugin-vue-components/vite';
import ViteFonts from 'vite-plugin-fonts';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

console.log(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    // https://github.com/jpkleemans/vite-svg-loader

    // https://github.com/antfu/vite-plugin-components
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          customCollections: ['custom'],
        }),
      ],
    }),
    Icons({
      scale: 1.125,
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader(join(__dirname, 'src', 'assets', 'svgs')),
      },
    }),
    // https://github.com/stafyniaksacha/vite-plugin-fonts#readme
    ViteFonts({
      google: {
        families: ['Open Sans', 'Montserrat', 'Fira Sans'],
      },
    }),
    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: 'prose prose-sm m-auto text-left',
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [resolve(__dirname, './locales/**')],
    }),
    AutoImport({
      /* options */
      imports: [
        // presets
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: true,
    }),
  ],

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
});
