import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import New from '../../src/components/home/new'
import ViewUser from '../../src/components/home/view-user'
//import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(Vuetify)
const localVue = createLocalVue()

/*describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})*/

describe(' View User.vue', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  });
  it('Shows how many images the logo has', () => {

     const wrapper = mount(ViewUser,{localVue, vuetify})

     const content = wrapper.find('h2')

    expect(content.text()).toBe('OffiRent');
  })
})

describe('New.vue', () =>{
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
    });
    it('Check connection between components top and top-valuation', ()=>{

        const wrapper = shallowMount(New, {localVue, vuetify})


        const topByName = wrapper.findComponent({name:'top'})
        const topValuationByName = wrapper.findComponent({name:'top-valuation'})

        expect(topByName.exists()).toBe(true)
        expect(topValuationByName.exists()).toBe(true)
    })


    it('Checking correct operation of office interface in new view', function () {
        const wrapper = mount(New, {localVue, vuetify})


        const button = wrapper.find('.v-btn')
        const text = wrapper.find('.v-icon')



        expect(button.text()).toBe('Reservar')
        expect(text.exists()).toBe(true)

    });
})

