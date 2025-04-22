import 'vuetify/styles';
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
 import { VDateInput } from 'vuetify/labs/VDateInput'
import { VBtn } from 'vuetify/components';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
export default createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
          },
        },
      },
    },
    aliases: {
      VBtnSecondary: VBtn,
      VBtnTertiary: VBtn,
      VBtnOutlined: VBtn, 
    },
    defaults: {
      VBtn: {
        color: 'primary',
        variant: 'text',
      },
      VBtnSecondary: {
        color: 'secondary',
        variant: 'flat',
      },
      VBtnTertiary: {
        rounded: true,
        variant: 'plain',
      },
      VBtnOutlined: {
        variant: 'outlined', 
      
      },
    },
  
    // components: {
    //     VDateInput,
    //     VAutocomplete
    //   },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })