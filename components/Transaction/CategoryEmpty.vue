<template>
  <div class="flex flex-col p-4 w-full items-center justify-center gap-4">
    <div class="flex gap-8 items-center justify-center">
      <img src="/assets/img/no_found_category.jpg" alt="No data" class="w-40 rounded-lg">
      <div class="flex flex-col gap-2">
        <h2>Damn!</h2>
        <p class="text-gray-200 w-full">
          There is no data, <br><NuxtLink to="/dashboard/manage">
            ask the devil to add some.
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
