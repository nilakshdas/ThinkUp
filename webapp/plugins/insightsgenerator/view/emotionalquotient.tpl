{include file=$tpl_path|cat:'_header.tpl'}
	
{if  !$expand }
<div class="pull-right detail-btn"><button class="btn btn-info btn-mini" data-toggle="collapse" data-target="#chart-{$i->id}"><i class="icon-signal icon-white"></i></button></div>
{/if}

<span class="label label-info"><i class="icon-white icon-heart"></i> <a href="?u={$i->instance->network_username}&n={$i->instance->network}&d={$i->date|date_format:'%Y-%m-%d'}&s={$i->slug}">{$i->prefix}</a></span>

<i class="icon-{$i->instance->network}{if $i->instance->network eq 'google+'} icon-google-plus{/if} icon-muted"></i>
{$i->text|link_usernames_to_twitter}

<div class="insight-attachment-detail post">
    {include file=$tpl_path|cat:"_post.tpl" post=$i->related_data[0] hide_insight_header=true}
</div>

{if !$expand}
<div class="collapse in" id="chart-{$i->id}">
{/if}
    
    <div id="emotional_quotient_{$i->id}">&nbsp;</div>
    <script type="text/javascript">
        {literal}
        (function(d3) {
          {/literal}
          var insight_slug = "{$i->slug}";
          var dataset = {$i->related_data[1]|@json_encode};
          if (insight_slug.substring(0,14) == 'emotional_post') new EmotionalQuotientRoseChart("emotional_quotient_{$i->id}",360,dataset,"{$i->related_data[0]->author_avatar}");
          {literal}else {
            for (var i = 0; i < dataset.length; i++) {
                {/literal}
                d3.select("#emotional_quotient_{$i->id}")
                .append("div")
                .attr("id", "emotional_quotient_{$i->id}_"+i)
                .attr("data-toggle", "tooltip")
                .attr("title", dataset[i].reply.post_text)
                .style("float", (i%2)?"right":"left");
                new EmotionalQuotientRoseChart("emotional_quotient_{$i->id}_"+i,280,dataset[i].emotions,dataset[i].reply.author_avatar);
                {literal}
            };
          }
        })(d3);
        {/literal}
    </script>

{if  !$expand}
</div>
{/if}

{include file=$tpl_path|cat:'_footer.tpl'}