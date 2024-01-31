<template>
	<div
		class="scroll-component"
		ref="scrollComponent"
		:data-sa="props.animation"
		:data-sa-delay="props.animationDelay"
		:data-sa-duration="props.animationDuration"
		:data-sa-easing="props.animationEasing"
		:data-sa-offset="props.animationOffset"
		:data-sa-repeat="props.animationRepeat"
		:data-sa-repeat-delay="props.animationRepeatDelay"
		:data-sa-repeat-duration="props.animationRepeatDuration"
		:data-sa-repeat-easing="props.animationRepeatEasing"
		:data-sa-repeat-offset="props.animationRepeatOffset"
		:data-sa-time="props.animationEasing"
		:data-sa-threshold="props.threshold"
	>
		<div class="scroll-component__content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from 'vue';

const scrollComponent = ref(null);
const props = defineProps({
	once: {
		type: Boolean,
		default: false,
	},
	threshold: {
		type: Number,
		default: 0,
	},
	animation: {
		type: String,
		default: 'fade',
		lowercase: true,
		validator: value => {
			return [
				'fade',
				'from-left',
				'from-right',
				'from-top',
				'from-bottom',
				'flip-top',
				'flip-right',
				'flip-bottom',
				'flip-left',
				'scale',
			].includes(value);
		},
	},
	animationDelay: {
		type: Number,
		default: 0,
	},
	animationDuration: {
		type: Number,
		default: 1000,
	},
	animationEasing: {
		type: String,
		default: 'ease',
	},
	animationOffset: {
		type: Number,
		default: 0,
	},
	animationRepeat: {
		type: Boolean,
		default: false,
	},
	animationRepeatDelay: {
		type: Number,
		default: 0,
	},
	animationRepeatDuration: {
		type: Number,
		default: 1000,
	},
	animationRepeatEasing: {
		type: String,
		default: 'ease',
	},
	animationRepeatOffset: {
		type: Number,
		default: 0,
	},
});

const animationComponent = reactive({
	threshold: 0.1,
	setThreshold: threshold => {
		if (typeof threshold === 'string') {
			threshold = threshold.trim();
			if (threshold === '') {
				console.warn('Threshold is empty string. Setting to 0.1');
			}
			if (!isFinite(Number(threshold))) {
				console.warn('Threshold is not a number. Setting to 0.1');
				threshold = 0.1;
			}
			threshold = Number(threshold);
		}
		if (typeof threshold !== 'number') {
			console.warn(`${threshold} is not a number. Setting to 0.1`);
			threshold = 0.1;
		}
		if (threshold < 0 || threshold > 1) {
			console.warn(`${threshold} is not between 0 and 1. Setting to 0.1`);
			threshold = 0.1;
		}
		animationComponent.threshold = threshold;
	},
	init: (threshold, observer) => {
		const node = scrollComponent.value;
		if (!node) {
			throw new Error('ScrollComponent is not mounted');
		}
		if (!threshold !== undefined) {
			animationComponent.setThreshold(threshold);
		}
		observer.observe(scrollComponent.value);
	},
});

onMounted(() => {
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const target = entry.target;
				// html 엘리먼트가 아니면 반환
				if (!(target instanceof HTMLElement)) {
					console.log('target is not HTMLElement');
					return;
				}
				// once가 false일때 화면밖으로 나갔을때 다시 애니메이션을 실행시키기 위해 클래스 제거
				if (props.once) {
					if (entry.isIntersecting) {
						console.log(entry.isIntersecting);
						target.classList.add('is-animated');
						observer.unobserve(target);
					}
				} else {
					if (entry.isIntersecting && !target.classList.contains('is-animated')) {
						target.classList.add('is-animated');
					} else {
						target.classList.remove('is-animated');
					}
				}
			});
		},
		{
			threshold: props.threshold,
		},
	);

	animationComponent.init(props.threshold, observer);
});
</script>
<style lang="scss">
.scroll-component {
	position: relative;
	overflow: hidden;
	opacity: 0;

	&__content {
		position: relative;
		z-index: 2;
	}
}

@mixin animation-mixin($arr, $duration, $delay) {
	&[data-sa='#{$arr}'] {
		animation: {
			duration: 1000ms;
			delay: 0ms;
			direction: normal;
			iteration-count: 1;
			play-state: running;
			timing-function: ease;
			fill-mode: forwards;
		}
		opacity: 0;

		&.is-animated {
			animation-name: sa-#{$arr};
		}
	}
}

.is-animated {
	$name: 'fade', 'from-left', 'from-right', 'from-top', 'from-bottom', 'flip-top', 'flip-right', 'flip-bottom',
		'flip-left', 'scale';

	@each $item in $name {
		@include animation-mixin($item, 1000ms, 0ms);
	}

	@for $i from 1 through 20 {
		&[data-sa-duration='#{$i*500}'] {
			animation-duration: #{$i * 500}ms;
		}
		&[data-sa-delay='#{$i*500}'] {
			animation-delay: #{$i * 500}ms;
		}
	}

	$position-items: 'from-left', 'from-right', 'from-top', 'from-bottom';
	@for $i from 1 through 20 {
		@each $item in $position-items {
			&[data-sa='#{$item}'][data-sa-offset='#{$i*50}'].saShow {
				animation-name: sa-#{$item}-#{$i * 50};
			}
		}

		&[data-sa='scale'][data-sa-scale='#{$i*5}'].saShow {
			animation-name: sa-scale-#{$i * 5};
		}
	}

	$time-functions: 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end';
	@each $item in $time-functions {
		&[data-sa-time='#{$item}'] {
			animation-timing-function: #{$item};
		}
	}
}
</style>
