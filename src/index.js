import ScrollComponent from '@/components/ScrollComponent.vue';

export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('ScrollComponent', ScrollComponent);
}

const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

ScrollComponent.install = install;

export default ScrollComponent;
