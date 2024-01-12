<script lang="ts">
    import { selectedFeature } from '$lib/stores/selectedFeatureStore';

</script>

{#if $selectedFeature.length > 0}
    <hr class="h-px my-2 bg-gray-200 border-0 ">
    <table class="table-auto w-full text-sm divide-y divide-gray-300 border-top-gray-300">
        <thead>
          <tr class="divide-x divide-gray-200">
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
            {#each Object.entries($selectedFeature[0].properties) as [key, value]}
                <tr class="divide-x divide-gray-200 even:bg-gray-100">
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            {/each}
</tbody>
    </table>
{/if}