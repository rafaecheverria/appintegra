<template>
    <div slot="header">
        <h4 class="card-title">{{title}}</h4>
        <p class="category">{{category}}</p>
    </div>
</template>

 <script>
    export default {
    name: 'cabecera',
    props: {
      title: String,
      category: String,
    },
  }
 </script>

 <style lang="scss">

.card-header:first-child {
    background:#122038;
    padding: 10px;
    width: 100%;
}

 </style>
