<script>
    let image_numbers = Array.from({ length: 13 }, (_, index) => index + 1);

    import {page} from '$app/stores'

    let page_name
    $:page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'))
</script>


<div class="achivements {page_name === '/' || page_name === '/events' ? 'pink-background' : ''}">
    <section class="container">
        <h2 class="{page_name === '/' || page_name === '/events' ? 'white-header' : ''}">ACHIVEMENTS</h2>
        <ul class="medias">
            {#each image_numbers as image (image)}
                <li class="media-images"><img src="../assets/media/{image}.png" alt="Media names"></li>
            {/each}
        </ul>
        <ul class="awards">
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
        </ul>
    </section>
</div>

<style>
    .awards > li > div{
        width: 100%;
        height: 30rem;
        background-color: var(--yellow);
        border-radius: 1rem;
    }
    .awards{
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    @media (width > 600px){
        .awards{
            grid-template-columns: 1fr 1fr;
        }
    }
    .pink-background{
        background-color: var(--pink);
        color: white;
    }
    .white-header{
        color: white;
    }
    .achivements{
        padding-block: 4rem;
    }
    h2{
        display: block;
        text-align: center;
        font-size: clamp(3.5rem, 5vw, 6rem);
        font-family: var(--font-anton);
        line-height: 115%;
        color: var(--pink);
        padding-bottom: 3.8rem;
    }
    
    .medias{
        display: flex;
        flex-wrap: wrap;
        gap: 1.3rem;
        justify-content: center;
        padding-bottom: 4rem;
    }
    @media (width < 700px){
        .media-images > img{
            height: 15vw;
        }
        .medias{
            gap: 1rem;
        }
    }
</style>
