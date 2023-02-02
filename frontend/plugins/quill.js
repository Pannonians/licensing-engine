import Vue from 'vue'
import VueQuillEditor from 'quill-vuejs'
import Quill from 'quill'
import ImageCompress from 'quill-image-compress'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

Quill.register('modules/imageCompress', ImageCompress)

Vue.use(VueQuillEditor, {
  modules: {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['direction', { align: [] }],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
    ],
    imageCompress: {
      quality: 0.5,
      maxWidth: 750,
      maxHeight: 750,
      imageType: 'image/jpeg',
      debug: false,
      suppressErrorLogging: false,
      insertIntoEditor: undefined,
    },
  },
})
