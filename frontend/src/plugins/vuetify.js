import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Paleta de cores inspirada em plataformas de streaming
const cinemaTheme = {
  dark: true,
  colors: {
    // Cor principal — vermelho cinema
    primary: '#E50914',
    // Cor secundária — dourado
    secondary: '#F5C518',
    // Fundo escuro
    background: '#141414',
    // Superfícies (cards, modais)
    surface: '#1F1F1F',
    // Texto sobre superfície escura
    'on-surface': '#FFFFFF',
    // Status das tarefas
    success: '#46D369',
    warning: '#F5C518',
    error: '#E50914',
    info: '#54B3D6',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'cinemaTheme',
    themes: { cinemaTheme },
  },
  defaults: {
    // Todo VBtn sem variant explícito usa "elevated" como padrão
    VBtn: {
      variant: 'elevated',
      rounded: 'lg',
    },
    // Todo VCard com bordas arredondadas
    VCard: {
      rounded: 'lg',
    },
    // Todo VTextField com estilo "outlined"
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
    // Todo VSelect com estilo "outlined"
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
})
