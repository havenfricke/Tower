<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-12 d-flex justify-content-center">
        <div class="row d-flex justify-content-center">
          <h1
            class="col-12 p-3 img-fluid border border-info rounded"
            style="
              width: 90vw;
              height: 60vh;
              background-image: url('https://www.em-normandie.com/sites/default/files/2019-12/msc-international-events-management.jpg')
              background-size: contain;
            "
          >
            <p class="p-2 border-bottom border-light">Events for everyone 
              <ul>
              <li class="fs-4 ms-5 mt-4">Plan your events</li>
              <li class="fs-4 ms-5 mt-4">Find events that interest you</li>
              <li class="fs-4 ms-5 mt-4">Become a part of the communities you love</li>
              <li class="fs-4 ms-5 mt-4">Set the world on fire</li>
              <li class="fs-4 ms-5 mt-4">Just kidding, but your parties will be lit</li>
              </ul>
              </p>
          </h1>
        </div>
    </div>
        <div class="row d-flex justify-content-center p-5">
          <div class="col-12 fs-5 bg-secondary rounded p-1 mx-3">
            <span class="row d-flex justify-content-around text-white p-3"><a class="col-3 text-center hoverable text-white">CONCERT</a><a class="col-3 text-center hoverable text-white">CONVENTION</a><a class="col-3 text-center hoverable text-white">SPORT</a><a class="col-3 text-center hoverable text-white">DIGITAL</a></span>
          </div>
        </div>
        <div class="container">
        <div class="row mx-4 my-3">
          <div class="col-4 rounded bg-light hoverable p-1">
            <EventCard />
          </div>
            
            
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.hoverable:hover {
  transform: scale(1.09);
  filter: drop-shadow(0px 15px 10px rgba(0, 0, 0, 0.3));
  transition: 50ms ease-in-out;
  cursor: pointer;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>
