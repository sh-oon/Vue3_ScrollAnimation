<template>
	<div class="gap">
		<ScrollComponent
			v-for="test in 7"
			:key="test"
			:animation="test % 2 === 0 ? 'from-left' : 'from-right'"
			:animationDelay="0"
			:animationDuration="1000"
			:animationEasing="'ease'"
		>
			<div class="card">
				<h1>Card {{ test }}</h1>
			</div>
		</ScrollComponent>
	</div>
</template>

<script setup>
import ScrollComponent from 'zion-scroll-animation';
</script>

<style lang="scss">
.gap {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 50vh;
}

.card {
	width: 300px;
	height: 300px;
	background-color: #2c3e50;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 14px;
}
</style>
