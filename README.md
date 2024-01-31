# Vue3_ScrollAnimation

vue3 scroll animation component

# scroll-components

## Package Install

```
npm install zion-scroll-animation
```

## Import in project

```
import  ZionScrollAnimation from 'zion-scroll-animation'
```

## Use in project

``` Vue
<template>
  <div id="app">
    <zion-scroll-animation :animation="animation" :duration="duration" :delay="delay" :offset="offset">
      <div class="box"></div>
    </zion-scroll-animation>
  </div>
</template>
```

### Options

| Option            | Type   | Default | Required | Description                                                                                                                                |
|-------------------|--------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| once              | Bool   | false   | true     | Every intersecting called animation                                                                                                        |
| animation         | String | 'fade'  | true     | animation name (e.x 'fade','from-left','from-right','from-top','from-bottom', 'flip-top', 'flip-right', 'flip-bottom','flip-left, 'scale', |
| animationDelay    | Number | 0       | false    | animation duration                                                                                                                         |
| animationDuration | Number | 1000    | false    | animation duration                                                                                                                         |
| animationEasing   | String | ease    | false    | animation duration                                                                                                                         |

### Animation

| Animation Name | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| fade           | fade in                                                                     |
| from-left      | from left                                                                   |
| from-right     | from right                                                                  |
| from-top       | from top                                                                    |
| from-bottom    | from bottom                                                                 |
| flip-top       | flip top                                                                    |
| flip-right     | flip right                                                                  |
| flip-bottom    | flip bottom                                                                 |
| flip-left      | flip left                                                                   |
| scale          | scale                                                                       | |

### Example

``` Vue
<template>
  <div id="app">
    <zion-scroll-animation :animation="animation" :duration="duration" :delay="delay" :offset="offset">
      <div class="box"></div>
    </zion-scroll-animation>
  </div>
</template>
   
<script>
import  ZionScrollAnimation from 'zion-scroll-animation'

export default {
  name: 'App',
  components: {
    ZionScrollAnimation
  },
  data() {
    return {
      animation: 'fade',
      duration: 1000,
      delay: 0,
      offset: 0
    }
  }
}
</script>
```

### Demo

[Demo](https://zion-ui.github.io/vue3-scroll-animation/)
