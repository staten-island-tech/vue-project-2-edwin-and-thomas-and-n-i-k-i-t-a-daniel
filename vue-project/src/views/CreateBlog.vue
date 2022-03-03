<template>
    <div>
        <editor 
            api-key="ffugz7x38mw73x297de4hhgulrnsse6ldbn7cumiyo99w54f" 
            :init="{
                height: 500,
                menubar: false,
                plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }"
        />
    </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>

<style scoped>

</style>