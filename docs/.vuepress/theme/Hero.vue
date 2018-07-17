<template>  
   <h1 data-splitting>Insert Hero here</h1>
</template>

<script>
export default {}
</script>

<style>
.splitting .word {
    overflow: hidden;
}
.splitting .char {
    /* a test animation to make sure splitting is initialized */
    animation: splitting-char-intro 350ms backwards;
    animation-delay: calc(700ms * var(--char-index, 0) / var(--char-total, 1))
}

@keyframes splitting-char-intro {
    0% { 
        transform: translateY(101%); 
    }
}
</style>