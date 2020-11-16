<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title, isActive } = context.props;
    const vnodes = [];

    if (icon) {
      if (icon.includes("img-")) {
        const path = require(`@/assets/img/tb/${icon}.png`);
        vnodes.push(<img src={path} />);
      } else if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    }

    if (title) {
      vnodes.push(
        <span slot="title" style="padding-left:5px;">
          {title}
        </span>
      );
    }
    return vnodes;
  },
};
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.el-menu-item.is-active {
  img {
    filter: hue-rotate(200deg);
  }
}
</style>
