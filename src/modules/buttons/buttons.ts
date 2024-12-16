import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

function createButton(
  primaryKeyName: string | undefined,
  buttonName: string,
  emoji: string,
  label: string,
  buttonStyle: "Primary" | "Secondary" | "Success" | "Danger"
): ButtonBuilder {
  let buttonStyleFinal: ButtonStyle;

  switch (buttonStyle) {
    case "Primary":
      buttonStyleFinal = ButtonStyle.Primary;
      break;
    case "Secondary":
      buttonStyleFinal = ButtonStyle.Secondary;
      break;
    case "Success":
      buttonStyleFinal = ButtonStyle.Success;
      break;
    case "Danger":
      buttonStyleFinal = ButtonStyle.Danger;
      break;
    default:
      buttonStyleFinal = ButtonStyle.Primary;
  }

  const button = new ButtonBuilder()
    .setCustomId(primaryKeyName ? `${primaryKeyName}_${buttonName}` : buttonName)
    .setEmoji(emoji)
    .setLabel(label)
    .setStyle(buttonStyleFinal);

  return button;
}

// pedir set
const createChannels = createButton("pedirset", "createChannels", "➕", "Criar canais", "Primary");
const editChannels = createButton("pedirset", "editChannels", "✍️", "Editar canais", "Primary");
const createRoles = createButton("pedirset", "createRoles", "🛂", "Add Cargos", "Primary");
const editRoles = createButton("pedirset", "editRoles", "🛂", "Edit Cargos", "Primary");

// createChannels
const createPedirset = createButton("pedirset", "createPedirset", "➕", "Criar Pedirset", "Primary");
const createAprovarset = createButton("pedirset", "createAprovarset", "➕", "Criar Aprovarset", "Primary");

// editChannels
const editPedirset = createButton("pedirset", "editPedirset", "✍️", "Editar Pedirset", "Primary");
const editAprovarset = createButton("pedirset", "editAprovarset", "✍️", "Editar Aprovarset", "Primary");

// createRoles
const createAprover = createButton("pedirset", "createAprover", "➕", "Criar cargo de aprovação", "Primary");
const createEntry = createButton("pedirset", "createEntry", "➕", "Criar cargo entrada", "Primary");

// editRoles
const editAprover = createButton("pedirset", "editAprover", "✍️", "Editar cargo de aprovação", "Primary");
const editEntry = createButton("pedirset", "editEntry", "✍️", "Editar cargo entrada", "Primary");

// geral
const close = createButton(undefined, "close", "❌", "Fechar", "Danger");
const back = createButton(undefined, "back", "⬅️", "Voltar", "Secondary");

// conin
export const componentsButtons = {
  pedirset: {
    footer: { text: "pedirset" },
    buttons: new ActionRowBuilder<ButtonBuilder>().addComponents(
      createChannels,
      editChannels,
      createRoles,
      editRoles,
      close
    ),
  },
  createChannels: {
    footer: { text: "createChannels" },
    buttons: new ActionRowBuilder<ButtonBuilder>().addComponents(
      createPedirset,
      createAprovarset,
      back,
      close
    ),
  },
  editChannels: {
    footer: { text: "editChannels" },
    buttons: new ActionRowBuilder<ButtonBuilder>().addComponents(editPedirset, editAprovarset, back, close),
  },
  createRoles: {
    footer: { text: "createRoles" },
    buttons: new ActionRowBuilder<ButtonBuilder>().addComponents(createEntry, createAprover, back, close),
  },
  editRoles: {
    footer: { text: "editRoles" },
    buttons: new ActionRowBuilder<ButtonBuilder>().addComponents(editEntry, editAprover, back, close),
  },
};
