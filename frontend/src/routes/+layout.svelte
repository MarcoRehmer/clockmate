<script>
    import MainHeader from '$lib/components/MainHeader.svelte';
    import Footer from "$lib/components/Footer.svelte";
    import "@material-symbols/font-200"
    import "../app.css";
</script>

<MainHeader/>
<slot/>
<Footer/>